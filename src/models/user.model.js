import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength:[2 , "firstname should atleast 2 characters"]
    },
    lastname: {
        type: String,
        required: true,
        minlength:[3 , "lastname should atleast 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 8 characters long"],
        maxlength: [128, "Password cannot exceed 128 characters"],
    },
}, { timestamps: true });



export const UserModel = mongoose.model("USER" , userSchema);