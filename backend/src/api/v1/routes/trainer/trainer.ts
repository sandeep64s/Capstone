import e, { Request, Response, Router } from "express";
import { Error } from "mongoose";
import trainer from "../../../../db/models/trainer";

const router = Router();

router.get('/trainers', (req: Request, res: Response) => {
    trainer.find({ isActive: true }).sort({ createdAt: -1 }).exec((err: any, data: any) => {
        if (err) {
            console.log(err)
            res.send(err)

        }
        else {
            console.log(data)
            res.send(data)
        }
    }
    )
})

router.post('/saveTrainer', (req: Request, res: Response) => {
    const { trainerPassword, trainerName, trainerCourse, trainerAvailability, trainerExperience, trainerJoiningDate, trainerEmail, trainerGender, trainerLocation } = req.body;
    let sliced = trainerJoiningDate.slice(0, 10);
    let newTrainer = new trainer({
        trainerName: trainerName,
        trainerCourse: trainerCourse,
        trainerAvailability: true,
        trainerExperience: trainerExperience,
        isActive: true,
        role:"trainer",
        trainerEmail: trainerEmail,
        trainerJoiningDate: sliced,
        trainerGender: trainerGender,
        trainerLocation: trainerLocation,
        trainerPassword:trainerPassword
    })
    newTrainer.save().then((result: any) => {
        res.send(result)
        console.log(result)
    }).catch((err: Error) => {
        console.log(err)
        res.send("Type mismatch")
    })
})

router.post('/updateTrainer', (req: Request, res: Response) => {
    let id = req.body.trainerId
    console.log(req.body, id);
    trainer.findOneAndUpdate({ _id: req.body._id }, req.body,
        function (err: Error, data: Object) {
            if (err) {
                console.log(err);
                res.send(err)
            }
            else {
                trainer.find({ isActive: true }, (err: Error, data: Object) => {
                    console.log(data);
                    res.send(data)
                })
            }
        })
})

router.post('/deleteTrainer/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    const joiningDate = new Date(req.body.trainerJoiningDate);
    trainer.updateOne({ _id: id }, {
        trainerName: req.body.trainerName,
        trainerCourse: req.body.trainerCourse,
        trainerAvailability: req.body.trainerAvailability,
        trainerExperience: req.body.trainerExperience,
        isActive: false,
        trainerEmail: req.body.trainerEmail,
        trainerLocation: req.body.trainerLocation
    },
        function (err: Error, data: Object) {
            if (err) {
                res.send(err)
            }
            else {
                trainer.find({ isActive: true }).sort({ createdAt: -1 }).exec((err: any, data: any) => {
                    if (err) {
                        console.log(err)
                        res.send(err)

                    }
                    else {
                        console.log(data)
                        res.send(data)
                    }
                }
                )


            }
        })
})

router.get('/filter',(req:Request,res:Response)=>{
    trainer.find(req.query,(err:Error,data:Object)=>{
        if(err){
            res.send(err)
        }
        else {
            res.send(data)
        }
    })
    
})



export default router;