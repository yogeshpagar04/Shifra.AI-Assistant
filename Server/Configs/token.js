import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// dotenv.config();

export const generateToken = async (user_id, email) => {

    try {
         const token = jwt.sign({ id: user_id, email: email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
    } catch (error) {
        console.error("Error generating token:", error.message);}
};

