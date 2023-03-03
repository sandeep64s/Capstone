import { Attendance } from '../../../../db/models/attendance';

import { Request, Response, RequestHandler } from "express";
import TraineeCollection from "../../../../db/models/trainee";

export const getAttendanceAll: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const results = await Attendance.find({});
    return results.length === undefined || results.length == 0
      ? res.status(200).send([])
      : res.status(200).send(results);
  } catch (err: any) {
    return res.status(400).send(err.message);
  }
};

export const getAttendanceByDateForTraining: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // create  a api that retunrs in the format :
  const { trainingId } = req.query;
  const data = await Attendance.aggregate([
    {
      $match: { trainingId: trainingId },
    },
    {
      $lookup: {
        from: "trainees",
        localField: "traineesPresent",
        foreignField: "traineeId",
        pipeline: [
          {
            $project: {
              _id: 0,
              email: 1,
              traineeId: 1,
              name: 1,
            },
          },
        ],
        as: "attendance",
      },
    },
    {
      $project: {
        _id: 0,
        date: 1,
        session: 1,
        attendance: 1,
      },
    },
    // { $unwind : "$attendance" } ,
    {
      $group: {
        _id: "$date",
        TotalSessions: { $sum: 1 },
        Attendance: {
          $push: { session: "$session", attendance: "$attendance" },
        },
      },
    },
    // {
    //   $project : { date : "$date" , session: "$session",traineeId:"$attendance.traineeId" ,email : "$attendance.email", name : "$attendance.name"},
    // }
    {
      $project: { _id: 0, date: "$_id", TotalSession: "$TotalSessions", AttendanceList: "$Attendance" },
    }

    // ,

  ]);

  return res.status(200).send(data);
};

const eqSet = (xs: Set<number>, ys: Set<number>) =>
  xs.size === ys.size &&
  [...xs].every((x) => ys.has(x));

export const createAttendance: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { trainingId, session, date } = req.body;
  console.log(req.body);
  const findExisting = await Attendance.findOne({
    date: new Date(req.body.date as string),
    session: req.body.session,
    trainingId: req.body.trainingId,
  });
  console.log(findExisting);

  if (!findExisting) {
    await Attendance.create({
      date: new Date(req.body.date),
      session: req.body.session,
      trainingId: req.body.trainingId,
      traineesPresent: req.body.traineesPresent,
    });
    console.log("Data inserted at time:" + new Date()); // Success
    const results = await Attendance.find();
    return results.length === undefined || results.length == 0
      ? res.status(200).send([])
      : res.status(200).send(results);
  } else {
    const traineesPresent = req.body.traineesPresent;
    // console.log(traineesPresent)
    const flag = 0;
    if (
      !eqSet(new Set(traineesPresent), new Set(findExisting.traineesPresent))
    ) {
      console.log('inside');
      const data = await Attendance.findOneAndUpdate(
        {
          date: new Date(req.body.date as string),
          session: req.body.session,
          trainingId: req.body.trainingId,
        },
        {
          $set: {
            traineesPresent: traineesPresent,
          },
        }
        , {
          new: true
        }
      )
      console.log(data);

      // LOOKUP HERE
      if (session) {
        const data = await TraineeCollection.aggregate([
          {
            $lookup: {
              from: "attendances",
              localField: "traineeId",
              foreignField: "traineesPresent",
              pipeline: [
                {
                  $match: {
                    session: session,
                    trainingId: trainingId,
                    date: new Date(date as string),
                  },
                },
              ],
              as: "attendance",
            },
          },
          {
            $project: {
              traineeId: 1,
              name: 1,
              email: 1,
              attendance: {
                $cond: {
                  if: { $eq: [{ $size: "$attendance" }, 0] },
                  then: "Absent",
                  else: "Present",
                },
              },
            },
          },
        ]);

        return res.status(200).send(data);
      } else {
        const data = await TraineeCollection.aggregate([
          {
            $lookup: {
              from: "attendances",
              localField: "traineeId",
              foreignField: "traineesPresent",
              pipeline: [
                {
                  $match: {
                    // session: { $in: ["M", "E"] },
                    trainingId: trainingId,
                    date: new Date(date as string),
                  },
                },
              ],
              as: "attendance",
            },
          },
          {
            $project: {
              traineeId: 1,
              name: 1,
              email: 1,
              session: 1,
              attendance: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $and: [
                          {
                            $eq: [{ $size: "$attendance" }, 1],
                          },
                          {
                            $eq: [
                              {
                                $size: {
                                  $filter: {
                                    input: "$attendance",
                                    as: "attendance",
                                    cond: {
                                      $eq: ["$$attendance.session", "M"],
                                    },
                                  },
                                },
                              },
                              1,
                            ],
                          },
                        ],
                      },
                      then: "Morning Half Day",
                    },
                    {
                      case: {
                        $and: [
                          {
                            $eq: [{ $size: "$attendance" }, 1],
                          },
                          {
                            $eq: [
                              {
                                $size: {
                                  $filter: {
                                    input: "$attendance",
                                    as: "attendance",
                                    cond: {
                                      $eq: ["$$attendance.session", "E"],
                                    },
                                  },
                                },
                              },
                              1,
                            ],
                          },
                        ],
                      },
                      then: "Evening Half Day",
                    },
                    {
                      case: { $eq: [{ $size: "$attendance" }, 2] },
                      then: "Present",
                    },
                  ],
                  default: "Absent",
                },
              },
            },
          },
        ]);
        return res.status(200).send(data);
      }

    } else return res.status(400).send("invalid");
  }
};

export const updateAttendance: RequestHandler = async (
  req: Request,
  res: Response
) => {
  //  const {trainingId,session, date }  = req.query;
  //  const await = await findOne(
  if (Object.keys(req.query).length != 3)
    return res
      .status(400)
      .send({ message: "All required fields not provided" });

  const { trainingId, session, date } = req.query;

  try {
    const data = await Attendance.findOneAndUpdate(
      {
        trainingId: trainingId,
        session: session,
        date: new Date(date as string),
      },
      {
        $set: {
          traineesPresent: req.body.traineesPresent,
        },
      }

    );
    if (data == null) throw new Error(`Could not find Attendance details`);

    const result = await TraineeCollection.aggregate([
      {
        $lookup: {
          from: "attendances",
          localField: "traineeId",
          foreignField: "traineesPresent",
          pipeline: [
            {
              $match: {
                session: session,
                trainingId: trainingId,
                date: new Date(date as string),
              },
            },
          ],
          as: "attendance",
        },
      },
      {
        $project: {
          traineeId: 1,
          name: 1,
          email: 1,
          attendance: {
            $cond: {
              if: { $eq: [{ $size: "$attendance" }, 0] },
              then: "Absent",
              else: "Present",
            },
          },
        },
      },
    ]);
    return res.status(200).send(result);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
};

export const getAttendance: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { session, trainingId, date } = req.query;

  if (session) {
    const data = await TraineeCollection.aggregate([
      {
        $lookup: {
          from: "attendances",
          localField: "traineeId",
          foreignField: "traineesPresent",
          pipeline: [
            {
              $match: {
                session: session,
                trainingId: trainingId,
                date: new Date(date as string),
              },
            },
          ],
          as: "attendance",
        },
      },
      {
        $project: {
          traineeId: 1,
          name: 1,
          email: 1,
          attendance: {
            $cond: {
              if: { $eq: [{ $size: "$attendance" }, 0] },
              then: "Absent",
              else: "Present",
            },
          },
        },
      },
    ]);

    return res.status(200).send(data);
  } else {
    const data = await TraineeCollection.aggregate([
      {
        $lookup: {
          from: "attendances",
          localField: "traineeId",
          foreignField: "traineesPresent",
          pipeline: [
            {
              $match: {
                // session: { $in: ["M", "E"] },
                trainingId: trainingId,
                date: new Date(date as string),
              },
            },
          ],
          as: "attendance",
        },
      },
      {
        $project: {
          traineeId: 1,
          name: 1,
          email: 1,
          session: 1,
          attendance: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [
                      {
                        $eq: [{ $size: "$attendance" }, 1],
                      },
                      {
                        $eq: [
                          {
                            $size: {
                              $filter: {
                                input: "$attendance",
                                as: "attendance",
                                cond: {
                                  $eq: ["$$attendance.session", "M"],
                                },
                              },
                            },
                          },
                          1,
                        ],
                      },
                    ],
                  },
                  then: "Morning Half Day",
                },
                {
                  case: {
                    $and: [
                      {
                        $eq: [{ $size: "$attendance" }, 1],
                      },
                      {
                        $eq: [
                          {
                            $size: {
                              $filter: {
                                input: "$attendance",
                                as: "attendance",
                                cond: {
                                  $eq: ["$$attendance.session", "E"],
                                },
                              },
                            },
                          },
                          1,
                        ],
                      },
                    ],
                  },
                  then: "Evening Half Day",
                },
                {
                  case: { $eq: [{ $size: "$attendance" }, 2] },
                  then: "Present",
                },
              ],
              default: "Absent",
            },
          },
        },
      },
    ]);
    return res.status(200).send(data);
  }
};
