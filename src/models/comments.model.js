import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {

        comment: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

    }, { timestamps: true }
)



export const CommentsModel = mongoose.model("Comment", commentSchema)
