import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema(
     {
    name: String,
    
    path: String,
    keywords: [String],
    default:[],
    },
    {_id: false}
);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    assistantname: {
        type: String,
        default: "Shifra",
        required: false,
    },
    businessname: {
        type: String,
        default: "",
        required: false,
    },
    businesstype: {
        type: String,
        default: "",
        required: false,
    },
    businessdescription: {
        type: String,
        default: "",
        required: false,
    },
   tone: {
        type: String,
        enum: ["Professional", "Casual", "Friendly", "Formal", "Humorous"],
        default: "Friendly",
        required: false,
    },
    theme: {
        type: String,
        enum: ["Light", "Dark", "Colorful", "Glassmorphism"],
        default: "Light",
        required: false,
    },
    enableVoice: {
        type: Boolean,
        default:true,
        required: false,
    },
    pages:{
        type: [pagesSchema],
            default: [],
    } ,
    enableNavigation: {
        type: Boolean,
        default: true,
        required: false,
    },
    geminiApikey: {
        type: String,
        default: "",
        required: false,
    },
    geminiStatus: {
        type: String,
        enum: ["active", "inactive", "pending", "quota_exceeded"],
        default: "active"
    },
    totalMessages: {
        type: Number,
        default: 0,
    },
    plan: {
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free",
    },
    requestLimit: {
        type: Number,
        default: 1000, // Default limit for free plan
    },
    ProEXpriresAt: {
        type: Date,
        default: null,
    },
    isSetupComplete: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;