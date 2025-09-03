import mongoose, { mongo } from "mongoose";

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        location: {
            type: { type: String, enum: ["Point"], default: "Point" },
            coordinates: { type: [Number], required: true } // [longitude, latitude]
        },

        address: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Reported", "In Progress", "Resolved"],
            default: "Reported",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        upvotes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    }, { timestamps: true }
)


issueSchema.index({location:'2dsphere'});//enable geo queries
export const IssuesModel=mongoose.model("Issue",issueSchema)
