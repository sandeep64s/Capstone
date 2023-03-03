import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'This Field is required'
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: 'This Field is required'
    },
    dob: {
        type: String
    },
    password: {
        type: String,
        required: 'This Field is required'
    },
    isActive: {
        type: Boolean
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model(process.env.ADMIN_COLLECTION as string, userSchema);

export { User }