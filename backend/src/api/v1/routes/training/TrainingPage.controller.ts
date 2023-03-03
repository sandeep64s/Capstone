const { validate, validateForPatch, Training } = require("../../../../db/models/trainingPage");
import {Router, Request, Response, RequestHandler } from 'express'

//@desc     Get all trainings
//@route    GET /trainings
//@access   Public

export const getTrainings : RequestHandler = async (req:Request, res:Response) => {
  try {
    /**************************** SELECT,SORT,PAGINATION *****************************/
       let query;
     //Copy req.query
        const reqQuery:any = { ...req.query, isDeleted: false };
        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];
        //Loop over removeFields and delete them from reqQuery
        removeFields.forEach((param):any => reqQuery[param]);
        //Create query string
        let queryStr = JSON.stringify(reqQuery);
        //Create operators ($gt,$gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        //Finding resource
        query = Training.find(JSON.parse(queryStr));
        //Select Fields
        if (req.query.select) {
          const qselect = req.query.select as string;
          const fields = qselect.split(',').join(' ');
          query = query.select(fields);
        }
        //Sort
        if (req.query.sort) {
         const qsort = req.query.sort as string;
         const sortBy = qsort.split(',').join(' ');
          query = query.sort(sortBy);
        } else {
          query = query.sort({trainingId:-1});
        }
        //count
        const totalTrainings = await Training.find({ isDeleted: false }).count();
        //Pagination
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10);
        const skip = (page - 1) * limit;
        //Executing query
        query = query.skip(skip).limit(limit);
        const trainings = await query;
    /****************************************************************************/
        return (trainings.length === undefined || trainings.length == 0)
          ? res.status(200).send({ count: totalTrainings, data: [] })
          : res.status(200).send({ count: totalTrainings, data: trainings });
      } catch (err:any) {
        return res.status(400).send(err.message);
      }
  };

//@desc     Get single training
//@route    GET /trainings/:id
//@access   Public

export const getTraining : RequestHandler = async (req:Request, res:Response) => {
  const id = req.params.id;
  try {
    const results = await Training.find({ trainingId: id, isDeleted: false });
    return (results === undefined || results.length == 0)
      ? res.status(200).send([])
      : res.status(200).send(results);
  } catch (err:any) {
    return res.status(400).send(err.message);
  }
};


//@desc     Create new training
//@route    POST /trainings
//@access   Private

export const createTraining  : RequestHandler = async (req:Request, res:Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const {
    title,
    description,
    trainingStartDate,
    trainingEndDate,
    isDeleted,
    techStack
  } = req.body;

  //Auto Generate Training ID
  let latestId = await Training.find().sort({ trainingId: -1 });
  if (latestId.length == 0) latestId = [{ trainingId: 1000 }]

  try {
    await Training.create({
      trainingId: (parseInt(latestId[0].trainingId) + 1).toString(),
      title: title,
      description: description,
      trainingStartDate: trainingStartDate,
      trainingEndDate: trainingEndDate,
      isDeleted: isDeleted,
      techStack: techStack
    });

    /********************** PAGINATION ************************/
    let query1;
    //Copy req.query
    const reqQuery1 = { ...req.query, isDeleted: false };
    //Create query string
    let queryStr1 = JSON.stringify(reqQuery1);
    //Finding resource
    query1 = Training.find(JSON.parse(queryStr1));
    query1 = query1.sort({trainingId:-1});
    //Pagination
    const page = parseInt(req.query.page as string , 10) || 1;
    const limit = parseInt(req.query.limit as string, 10);
    const skip = (page - 1) * limit;
    //Total Count
    const totalTrainings1 = await Training.find({ isDeleted: false }).count();
    //Executing query
    const trainings1 = await query1.skip(skip).limit(limit);
    /***********************************************************/

    console.log("Data inserted at time:" + new Date()); // Success
    return (trainings1 === undefined || trainings1.length == 0)
      ? res.status(200).send({ count: totalTrainings1, data: [] })
      : res.status(200).send({ count: totalTrainings1, data: trainings1 });
  } catch (err:any) {
    return res.status(400).send(err.message);
  }
};


//@desc     Update trainings
//@route    PATCH /trainings/:id
//@access   Private

export const updateTraining  : RequestHandler= async (req:Request, res:Response) => {
  const { error } = validateForPatch(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const id = req.params.id;

  await Training.updateOne(
    { trainingId: id },
    {
      $set: {
        //trainingId:req.body.trainingId,
        title: req.body.title,
        description: req.body.description,
        trainingStartDate: req.body.trainingStartDate,
        trainingEndDate: req.body.trainingEndDate,
        isDeleted: req.body.isDeleted,
        techStack: req.body.techStack
      },
    }
  )
    .then(async function () {
      console.log("Data updated at time:" + new Date()); // Success

      /********************** PAGINATION ************************/
      let query2;
      //Copy req.query
      const reqQuery2 = { ...req.query, isDeleted: false };
      //Create query string
      let queryStr2 = JSON.stringify(reqQuery2);
      //Finding resource
      query2 = Training.find(JSON.parse(queryStr2));
      query2 = query2.sort({ trainingId: -1 });
      //Pagination
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10);
      const skip = (page - 1) * limit;
      //Total Count
      const totalTrainings2 = await Training.find({ isDeleted: false }).count();
      //Executing query
      const trainings2 = await query2.skip(skip).limit(limit);
      /***********************************************************/

      const modifiedTrainings = await Training.find({ trainingId: req.params.id, isDeleted: false });

      return (modifiedTrainings === undefined || trainings2 === undefined || trainings2.length == 0)
        ? res.status(200).send({ count: 0, data: [] }) :
        res.status(200).send({count: totalTrainings2, data: trainings2, modifiedData: modifiedTrainings });
    })
    .catch(function (error:any) {
      console.log("Could not insert data"); // Failure
      return res.status(400).send(error.message);
    });
};


//@desc     Delete trainings
//@route    DELETE /trainings/:id
//@access   Private

export const deleteTraining = async (req:Request, res:Response) => {
  const id = req.params.id;
  try {
    const found = await Training.findOne({ trainingId: id, isDeleted: false });
    if (found.length == 0) throw new Error(); //added feature to handle case of training/1-1 error
    await Training.updateOne(
      {
        trainingId: id,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        },
      }
    )
    console.log("Data deleted at time: " + new Date());

    /********************** PAGINATION ************************/
    let query3;
    //Copy req.query
    const reqQuery3 = { ...req.query, isDeleted: false };
    //Create query string
    let queryStr3 = JSON.stringify(reqQuery3);
    //Finding resource
    query3 = Training.find(JSON.parse(queryStr3));
    query3 = query3.sort({ trainingId: -1 });
    //Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10);
    const skip = (page - 1) * limit;
    //Total Count
    const totalTrainings3 = await Training.find({ isDeleted: false }).count();
    //Executing query
    const trainings3 = await query3.skip(skip).limit(limit);
    /***********************************************************/

    return (trainings3 === undefined || trainings3.length == 0)
      ? res.status(200).send({ count: totalTrainings3, data: [] })
      : res.status(200).send({ count: totalTrainings3, data: trainings3 });

  } catch (err) {
    return res.status(400).send("Training Not found ");
  }
};