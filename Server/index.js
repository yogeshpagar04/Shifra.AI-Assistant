import express from "express";
import dotenv from "dotenv";
import connectDB from "./Configs/ConnectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import userRouter from "./Routes/user.route.js";
import assistantRouter from "./Routes/assistant.route.js";

// const app = express();
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

const app=express();
const PrivateCors=
cors ({
    // origin: ["https://shifraai-k1ai.onrender.com"],
        origin:"https://shifra-yp-ai-assistant.onrender.com",

    credentials: true
});

const PublicCors=
cors ({
    origin: "*",
    // credentials: true
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.use("/api/auth", authRouter);

// app.use("/api/user", userRouter);

// app.use("/api/assistant", assistantRouter);

app.use("/api/auth",PrivateCors, authRouter);

app.use("/api/user", PrivateCors, userRouter);

app.use("/api/assistant", PublicCors, assistantRouter);

// const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server is running on port ${PORT}`);
// });

//     connectDB();
// });
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
