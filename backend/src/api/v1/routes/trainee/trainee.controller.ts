import { Request, RequestHandler, Response } from "express";
import TraineeCollection from "../../../../db/models/trainee";
import { Trainee } from "../../../../types/trainee";
import { generateId } from "../../../../utils";
import { customLogger } from "../../middleware/logging";

// GET /trainee (get all trainees)
export const getTrainees: RequestHandler = async (
  req: Request,
  res: Response
) => {
  enum reqTypes {
    all = "all",
    active = "active",
    deleted = "deleted",
  }
  let reqType: reqTypes = reqTypes.all;
  if (req.query.t && req.query.t.toString() in reqTypes)
    reqType = req.query.t as reqTypes;
  try {
    const page = req.query.p
      ? isNaN(Number(req.query.p))
        ? 1
        : Number(req.query.p)
      : 1;
    const perPage = req.query.pp
      ? isNaN(Number(req.query.pp))
        ? 5
        : Number(req.query.pp)
      : 5;
    if (reqType === "active") {
      const total = await TraineeCollection.countDocuments({
        isDeleted: false,
      });
      const pageCount = Math.ceil(total / perPage);
      const trainees = await TraineeCollection.find({ isDeleted: false })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ _id: -1 });
      return res.status(200).json({
        page,
        pageCount,
        perPage,
        total,
        trainees,
      });
    } else if (reqType === "deleted") {
      const total = await TraineeCollection.countDocuments({
        isDeleted: true,
      });
      const pageCount = Math.ceil(total / perPage);
      const trainees = await TraineeCollection.find({ isDeleted: true })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ _id: -1 });
      return res.status(200).json({
        page,
        pageCount,
        perPage,
        total,
        trainees,
      });
    } else if (reqType === "all") {
      const total = await TraineeCollection.countDocuments();
      const pageCount = Math.ceil(total / perPage);
      const trainees = await TraineeCollection.find({})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ _id: -1 });
      return res.status(200).json({
        page,
        pageCount,
        perPage,
        total,
        trainees,
      });
    }
  } catch (err: any) {
    customLogger("error", err.message);
    return res.status(500).send(err.message);
  }
};

// GET /trainee/:id (get trainee by id or by training id)
export const getTraineeById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  enum reqTypes {
    default = "default",
    training = "training",
  }
  let reqType: reqTypes = reqTypes.default;
  if (req.query.t && req.query.t.toString() in reqTypes)
    reqType = req.query.t as reqTypes;

  if (isNaN(Number(req.params.id))) return res.status(400).send("Invalid ID");
  try {
    if (reqType === "training") {
      const trainee = await TraineeCollection.findOne({
        "training.trainingId": Number(req.params.id),
      });
      return res.status(200).json(trainee);
    } else {
      const trainee = (await TraineeCollection.findOne({
        traineeId: Number(req.params.id),
      })) as Trainee;
      if (!trainee) return res.status(404).send("Trainee not found");
      return res.status(200).send(trainee);
    }
  } catch (err: any) {
    customLogger("error", err.message);
    return res.status(500).send(err.message);
  }
};

// POST /trainee
// !NOTE:
// Compulsory fields are added by admin
// Optional fields are added by user by filling the form (Update)

export const createTrainee: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // Programmatically generate traineeId and password
  const traineeId = await generateId(TraineeCollection);
  // Frontend should show password to user
  const password =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const trainee = {
    traineeId,
    ...req.body,
    password,
    isDeleted: false,
    isValid: false,
  } as Trainee;
  try {
    const newTrainee = await TraineeCollection.create(trainee);
    const result = await newTrainee.save();
    customLogger("success", `Trainee created at ${result.traineeId}`);
    return res.status(201).send(trainee);
  } catch (err: any) {
    customLogger("error", err.message);
    if (err.code === 11000)
      return res.status(400).send("Trainee with given email already exists");
    else
      return res
        .status(500)
        .send(err.message + ". Please check the document structure carefully.");
  }
};

// PUT /trainee/:id
export const updateTrainee: RequestHandler = async (
  req: Request,
  res: Response
) => {
  delete req.body.traineeId;
  delete req.body.password;
  delete req.body.isDeleted;
  delete req.body.isValid;

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const profilePic = files?.profilePic
    ? {
        filename: files?.profilePic?.[0].filename,
        path: files?.profilePic?.[0].path,
        size: files?.profilePic?.[0].size,
        type: files?.profilePic?.[0].mimetype,
      }
    : undefined;

  const resume = files?.resume
    ? {
        filename: files?.resume?.[0].filename,
        path: files?.resume?.[0].path,
        size: files?.resume?.[0].size,
        type: files?.resume?.[0].mimetype,
      }
    : undefined;

  try {
    // * Find the trainee added by admin
    const trainee = (await TraineeCollection.findOne({
      traineeId: Number(req.params.id),
    }).lean()) as Trainee;

    const updatedTrainee = {
      ...trainee,
      ...req.body,
      isValid: true,
      resume,
      profilePic,
    } as Trainee;

    const result = await TraineeCollection.updateOne(
      { traineeId: Number(req.params.id) },
      { $set: updatedTrainee }
    );

    if (result.matchedCount === 0)
      return res.status(404).send("Trainee not found");

    customLogger("success", `Trainee updated at ${updatedTrainee.traineeId}`);
    return res.status(200).send(updatedTrainee);
  } catch (err: any) {
    customLogger("error", err.message);
    if (err.code === 11000)
      return res.status(400).send("Trainee with given email already exists");
    else
      return res
        .status(500)
        .send(err.message + ". Please check the document structure carefully.");
  }
};

// DELETE /trainee/:id
// Hard and Soft delete
export const deleteTrainee: RequestHandler = async (
  req: Request,
  res: Response
) => {
  enum reqTypes {
    soft = "soft",
    hard = "hard",
  }
  let reqType: reqTypes = reqTypes.soft;
  if (req.query.t && req.query.t.toString() in reqTypes)
    reqType = req.query.t as reqTypes;

  try {
    if (reqType === "soft") {
      const result = await TraineeCollection.updateOne(
        {
          traineeId: Number(req.params.id),
        },
        { $set: { isDeleted: true } }
      );

      if (result.matchedCount === 0) {
        customLogger("error", "Trainee not found");
        return res.status(404).send("Trainee not found");
      }

      if (result.modifiedCount === 0) {
        customLogger("error", "Trainee is already deleted");
        return res.status(400).send("Trainee is already deleted");
      }

      const page = 1;
      const perPage = 5;
      const total = await TraineeCollection.countDocuments({
        isDeleted: false,
      });
      const pageCount = Math.ceil(total / perPage);

      const trainees = await TraineeCollection.find({
        isDeleted: false,
      })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ _id: -1 });

      customLogger("success", `Trainee set as deleted`);
      return res.status(200).send({
        page,
        pageCount,
        perPage,
        total,
        trainees,
      });
    } else {
      const result = await TraineeCollection.deleteOne({
        traineeId: Number(req.params.id),
      });

      if (result.deletedCount === 0) {
        customLogger("error", "Trainee not found");
        return res.status(404).send("Trainee not found");
      }
      const page = 1;
      const perPage = 5;
      const total = await TraineeCollection.countDocuments({
        isDeleted: false,
      });
      const pageCount = Math.ceil(total / perPage);

      const trainees = await TraineeCollection.find({
        isDeleted: false,
      })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ _id: -1 });

      customLogger("success", `Trainee deleted`);
      return res.status(200).send({
        page,
        pageCount,
        perPage,
        total,
        trainees,
      });
    }
  } catch (err: any) {
    customLogger("error", err.message);
    return res.status(500).send(err.message);
  }
};

// PATCH /trainee/:id
export const patchTrainee: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await TraineeCollection.findOneAndUpdate(
      {
        traineeId: Number(req.params.id),
      },
      { $set: { isDeleted: false } },
      { returnDocument: "after" }
    );

    customLogger("success", `Trainee updated`);
    return res.status(200).send(result);
  } catch (err: any) {
    customLogger("error", err.message);
    return res.status(500).send(err.message);
  }
};
