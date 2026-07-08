// import mongoose from "mongoose";

// const pagesSchema = new mongoose.Schema(
//      {
//     name: String,
    
//     path: String,
//     keywords: [String],
//     default:[],
//     },
//     {_id: false}
// );

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: false,
//     },
//     email: {
//         type: String,
//         required: false,
//         unique: true,
//     },
//     assistantname: {
//         type: String,
//         default: "Shifra",
//         required: false,
//     },
//     businessname: {
//         type: String,
//         default: "",
//         required: false,
//     },
//     businesstype: {
//         type: String,
//         default: "",
//         required: false,
//     },
//     businessdescription: {
//         type: String,
//         default: "",
//         required: false,
//     },
//    tone: {
//         type: String,
//         enum: ["professional", "casual", "friendly", "formal", "humorous"],
//         default: "friendly",
//         required: false,
//     },
//     theme: {
//         type: String,
//         enum: ["light", "dark", "neon", "glass"],
//         default: "light",
//         required: false,
//     },
//     enableVoice: {
//         type: Boolean,
//         default:true,
//         required: false,
//     },
//     pages:{
//         type: [pagesSchema],
//             default: [],
//     } ,
//     enableNavigation: {
//         type: Boolean,
//         default: true,
//         required: false,
//     },
//     geminiApikey: {
//         type: String,
//         default: "",
//         required: false,
//     },
//     geminiStatus: {
//         type: String,
//         enum: ["active", "inactive", "pending", "quota_exceeded"],
//         default: "active"
//     },
//     totalMessages: {
//         type: Number,
//         default: 0,
//     },
//     plan: {
//         type: String,
//         enum: ["free", "pro", "enterprise"],
//         default: "free",
//     },
//     requestLimit: {
//         type: Number,
//         default: 1000, // Default limit for free plan
//     },
//     ProEXpriresAt: {
//         type: Date,
//         default: null,
//     },
//     isSetupComplete: {
//         type: Boolean,
//         default: false,
//     },

// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);

// export default User;



import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    assistantName: {
      type: String,
      default: "Shifra",
    },

    businessName: {
      type: String,
      default: "",
    },

    businessType: {
      type: String,
      default: "",
    },

    businessDescription: {
      type: String,
      default: "",
    },

    tone: {
      type: String,
      enum: ["friendly", "professional", "sales", "playful"],
      default: "friendly",
    },

    theme: {
      type: String,
      enum: ["light", "dark", "glass", "neon"],
      default: "dark",
    },

    enableVoice: {
      type: Boolean,
      default: true,
    },

    enableNavigation: {
      type: Boolean,
      default: true,
    },

    pages: {
      type: [pagesSchema],
      default: [],
    },

    geminiApikey: {
      type: String,
      default: "",
    },

    geminiStatus: {
      type: String,
      enum: ["active", "inactive", "pending", "quota_exceeded"],
      default: "inactive",
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
      default: 1000,
    },

    proExpiresAt: {
      type: Date,
      default: null,
    },

    isSetupComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;