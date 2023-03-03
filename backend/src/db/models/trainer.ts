import mongoose from "mongoose";

var trainerSchema = new mongoose.Schema({
    trainerName:{
        $type:String
    },
    trainerCourse:{
        trainingId:{
            $type:String
        },
        title:{
            $type:String
        },
        description:{
            $type:String
        },
        techStack:{
            $type:String
        },
    },
    trainerAvailability:{
        $type:Boolean
    },
    trainerExperience:{
        $type:String
    },
    trainerJoiningDate:{
        $type: String
    },
    isActive: {
        $type: Boolean || String
    },
    trainerEmail:{
        $type:String
    },
    trainerGender:{
        $type:String
    },
    trainerLocation:{
        $type:String
    },
    role:{
        $type:String,
        //required:true
    },
    trainerPassword:{
        $type:String,
        //required:true
    }
},{collection:'trainers', timestamps: true,typeKey:'$type'});
const Trainer = mongoose.model('Trainer',trainerSchema);

export default Trainer;