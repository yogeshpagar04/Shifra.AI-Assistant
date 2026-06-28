import User from "../Models/User.Model.js";
import { generateToken } from "../Configs/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            user =  await User.create({ name, email });
            await user.save();
        }
        console.log("user data ::: ", user)
        const token = await generateToken(user._id, user.email);
        res.cookie("token", token, { httpOnly: true,secure:false, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
       return res.status(200).json({ message: "Google authentication successful", user });
    } catch (error) {
        console.error("Google authentication failed:", error.message);
       return res.status(500).json({ message: `"Internal server error" ${error.message}` });
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout failed:", error.message);
        return res.status(500).json({ message: `logout failed ${error.message}` });
    }
};
   