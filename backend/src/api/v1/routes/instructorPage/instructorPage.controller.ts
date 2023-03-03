import { instructorForm } from './instructorPage.model';
import { Request, Response } from "express";
import {InstructorPage as Instructor} from '../../../../db/models/instructorPage';
 
//POST /api/apply
export const apply = async (req:Request, res:Response) => {
  const { name, companyName, dateStart, dateEnd, trainingType, stack, email } =
    req.body;

  //created an auto-increment functionality to keep track of userId in the database
  let data = await Instructor.find({}, { userId: 1 })
    .sort({ userId: -1 })
    .limit(1);

  let newInstructor = new Instructor({
    userId: data.length ? data[0].userId + 1 : 0, //checks if there is no data in db it initailize it with 0
    name,
    companyName,
    dateStart,
    dateEnd,
    trainingType,
    stack,
    email,
  });

  newInstructor
    .save()
    .then((result:object) => res.json(result))
    .catch((err:object) => res.json(err));
};

//GET /api/applications
export const applications = (req:Request, res:Response) => {
  //change isDeleted to true
  Instructor.find({ isDeleted: false }, { isDeleted: 0 }, (err:object, data:instructorForm[]) => {
    if (err) res.json(err);
    else {
      //check if there is no application in the database
      data.length === 0
        ? res.json({ ...data, message: "There is no data." })
        : res.json(data);
    }
  });
};

//DELETE /api/applications/:_id
export const removeApplication = (req:Request, res:Response) => {
  const { _id } = req.params;
  Instructor.updateOne(
    { _id, isDeleted: false },
    { isDeleted: true },
    (err:any, data:any) => {
      if (err) res.json(err);
      else {
        //Checking if the ID exist in the database
        //If false sends back the error message
        //Else deletes the application and sends back the success message and list of left applications
        data.deletedCount === 0
          ? res
              .status(404)
              .json({ ...data, error: `Instructor ID ${_id} not found.` })
          : Instructor.find({ isDeleted: false }, (err:any, data:any) =>
              err
                ? res.json(err)
                : res.json({
                    data,
                    message: `Instructor ID ${_id} is deleted successfully.`,
                  })
            );
      }
    }
  );
};

//PATCH /api/editApplication/:_id
export const editApplication = (req:Request, res:Response) => {
  const { _id } = req.params;
  const updatedDataObject = req.body;
  Instructor.updateOne({ _id }, updatedDataObject, (err:any, result:any) => {
    //Checking if the ID exist in the database
    //If false sends back the error message
    //Else edits the application details and sends back the success message and updated application object
    err
      ? res.json(err)
      : Instructor.find({ isDeleted: false }, { isDeleted: 0 }, (err:any, data:any) => {
          if (err) res.json(err);
          else {
            if (data.length === 0)
              res.json({ ...data, message: "There is no data." });
            else
              res.json({
                data: data,
                message: `Application updated successfully.`,
              });
          }
        });
  });
};
