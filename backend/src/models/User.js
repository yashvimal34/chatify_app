import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    fullName: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    
    profilPic: {
        type: String,
        default: ""
    },
},
 {timestamps: true} // This basically check when user last login or createdAt or Updated Profile.
);

const User = mongoose.model("User",userSchema);
export default User;