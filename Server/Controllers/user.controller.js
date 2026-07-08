
import User from "../Models/User.Model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set in the isAuth middleware
        // Fetch user profile from the database using userId
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: `get current user error: ${error.message}` });
    }
};

export const SaveAssistant = async (req, res) => {
    try {
        const{
            assistantName,
            businessName,
            businessDescription,
            businessType,
            tone,
            theme,
            geminiApikey,
            pages,
        } = req.body;
        
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Failed to get current user" });
        }
        user.assistantName = assistantName;
        user.businessName = businessName;
        user.businessDescription = businessDescription;
        user.businessType = businessType;
        user.tone = tone;
        user.theme = theme;
        if (geminiApikey) {
            user.geminiApikey = geminiApikey;
        }
   
        user.geminiStatus = "active";

        user.pages = pages || [];

        user.isSetupComplete = true;

        await user.save();
        return res.status(200).json({ message: "Assistant saved successfully", user });

    } catch (error) {
        return res.status(500).json({ message: ` failed to save assistant error: ${error.message}` });
    }
}