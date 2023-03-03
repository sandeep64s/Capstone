
import { Schema, model } from 'mongoose'
const Joi = require('joi');

import { TrainingType } from '../../api/v1/routes/training/trainingPage.model'
// import 
// Training Schema: 
const findSpecial = (value: string) => {
    var re = /[^\w\*]/;
    console.log(value.match(re));
    return value.match(re);

}

const titleMatch = (value: string) => {
    var reEx = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    console.log(value.match(reEx));
    return value.match(reEx);
}


const schema = new Schema<TrainingType>({
    trainingId: {
        type: String,
        minlength: 1,
        maxlength: 255,
        unique: true,
        trim: true,
        validate(value: string) {
            if (findSpecial(value)) throw new Error('Training ID must not contain any special chracters');
        }
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
        validate(value: string) {
            if (titleMatch(value)) throw new Error('Training Name must not contain any special chracters');
        }
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
        trim: true

    },
    trainingStartDate: {
        type: Date,
        required: true,
        default: Date.now,
        trim: true,
    },
    trainingEndDate: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
        trim: true
    },
    techStack: {
        type: String,
        required: true,
        trim: true
    }
}, { versionKey: false });

const Training = model('training', schema);

function validateTraining(training: TrainingType) {
    const schema = Joi.object({
        trainingId: Joi.string(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        trainingStartDate: Joi.date(),
        trainingEndDate: Joi.date(),
        isDeleted: Joi.boolean(),
        techStack: Joi.string().required()
    });
    return schema.validate(training);

}

function validateTrainingForPatch(training: TrainingType) {
    const schema = Joi.object({
        trainingId: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        trainingStartDate: Joi.date(),
        trainingEndDate: Joi.date(),
        isDeleted: Joi.boolean(),
        techStack: Joi.string()
    });
    return schema.validate(training);
}

exports.validate = validateTraining;
exports.validateForPatch = validateTrainingForPatch;
export { Training };