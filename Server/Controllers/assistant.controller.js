import mongoose from "mongoose";
import User from "../Models/User.Model.js";

export const getAssistantConfig = async (req, res) => {
    try {
        const{userId}= req.params;

        const user=await User.findById(userId).select("-geminiApiKey")

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message:" Assistant config  data",user });
    }catch (error) {
      return  res.status(500).json({ message: `Error fetching assistant config failed: ${error}` });
    }
}

export const askAssistant = async (req, res) => {
    try {
        const {message, userId}=req.body;

    if (!message || !userId) {
        return res.status(400).json({ message: "Message and userId are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
        if (!user.geminiApiKey) {
            return res.status(400).json({ message: "User does not have a Gemini API key added" });
        }
        if(user.plan==="free" && user.totalMessages>=user.requestLimit){
            return res.status(400).json({ message: "free plan limit reached" });
        }
        if(user.plan==="pro" && new Date(user.proExpiresAt)<new Date()){ 
            user.plan="free";
            await user.save();
            return res.status(400).json({ message: "pro plan has expired" });
        }
        const cleanedMessage = message.toLowerCase()

        if(user.enableNavigation){
            const navigationResponse = [
                "open",
                "go",
                "navigate",
                "start",
                "show",
                "take me",

            ];

            const wantsNavigation = 
            navigationWords.some((word )=> cleanMessage.startsWith(word));
        }

    } catch (error) {
        return res.status(500).json({ message: `Error asking assistant failed: ${error}` });
    }
}