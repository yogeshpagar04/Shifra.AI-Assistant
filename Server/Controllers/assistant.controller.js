import mongoose from "mongoose";
import User from "../Models/User.Model.js";
import { generateGeminiResponse } from "../Configs/gemini.js";

export const getAssistantConfig = async (req, res) => {
    try {
        const{userId}= req.params;

        const user=await User.findById(userId).select("-geminiApikey")

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message:" Assistant config  data",user });
    }catch (error) {
      return  res.status(500).json({ message: `Error fetching assistant config failed: ${error}` });
    }
}

// export const askAssistant = async (req, res) => {
//     try {
//         const {message, userId}=req.body;

//     if (!message || !userId) {
//         return res.status(400).json({ message: "Message and userId are required" });
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }
//         if (!user.geminiApikey) {
//             return res.status(400).json({ message: "User does not have a Gemini API key added" });
//         }
//         if(user.plan==="free" && user.totalMessages>=user.requestLimit){
//             return res.status(400).json({ message: "free plan limit reached" });
//         }
//         if(user.plan==="pro" && new Date(user.proExpiresAt)<new Date()){ 
//             user.plan="free";
//             await user.save();
//             return res.status(400).json({ message: "pro plan has expired" });
//         }
//         const cleanedMessage = message.toLowerCase()

//         if(user.enableNavigation){
//             const navigationResponse = [
//                 "open",
//                 "go",
//                 "navigate",
//                 "start",
//                 "show",
//                 "take me",

//             ];

//             const wantsNavigation = 
//             navigationWords.some((word )=>
//                  cleanMessage.startsWith(word));

//             if(wantsNavigation){
//                 const matchedPage=
//                 user.pages.find((page)=>
//                     page.keywords.some((keyword)=>
//                         cleanedMessage.includes(keyword.toLowerCase())
//             )
//         )
//         if(matchedPage){
//             if(
//                 req.body.currentpath===
//                 matchedPage.path
//             )
//         {
//             return res.json({
//                 success:true,
//                 response:
//                 `${matchedPage.name} already open`
//             })
//         }
//          return res.json({
//             success:true,
//             action:"navigate",
//             path:matchedPage.path,
//             response:`opening${matchedPage.name}`
//             })
//         }
//     }
// }
// const prompt=`
// You are $ {user.assistantName}.
// Business name: ${user.businessName}

// Business Type: ${user.businessType}

// Business Description: ${user.businessDescription}

// Assistant Tone: ${user.tone}

// Rules:
// -Keep replies under 100 words
// -Give fast direct responses
// -Talk naturally
// -Behave like a smart voice assistant
// -Avoid long explanations
// -keep responses short for quick voice playback

// User Question: ${message}
// `;
// const aiResponse=await generateGeminiResponse(prompt,user.geminiApikey,user);
// if(user.plan==="free" ){
// user.totalMessages+=1;
// await user.save();
// }
// return res.json({ success:true, response:aiResponse });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Assistant AI Error"
//         });
//     }
// }


export const askAssistant = async (req, res) => {
    try {
        const { message, userId, currentPath } = req.body;

        if (!message || !userId) {
            return res.status(400).json({
                message: "Message and userId are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!user.geminiApikey) {
            return res.status(400).json({
                message: "User does not have a Gemini API key added"
            });
        }

        if (user.plan === "free" && user.totalMessages >= user.requestLimit) {
            return res.status(400).json({
                message: "Free plan limit reached"
            });
        }

        if (
            user.plan === "pro" &&
            user.proExpiresAt &&
            new Date(user.proExpiresAt) < new Date()
        ) {
            user.plan = "free";
            await user.save();

            return res.status(400).json({
                message: "Pro plan has expired"
            });
        }

        const cleanedMessage = message.toLowerCase();

        if (user.enableNavigation) {

            const navigationWords = [
                "open",
                "go",
                "navigate",
                "start",
                "show",
                "take me"
            ];

            const wantsNavigation = navigationWords.some((word) =>
                cleanedMessage.startsWith(word)
            );

            if (wantsNavigation) {

                const matchedPage = user.pages.find((page) =>
                    page.keywords.some((keyword) =>
                        cleanedMessage.includes(keyword.toLowerCase())
                    )
                );

                if (matchedPage) {

                    if (currentPath === matchedPage.path) {
                        return res.json({
                            success: true,
                            response: `${matchedPage.name} is already open`
                        });
                    }

                    return res.json({
                        success: true,
                        action: "navigate",
                        path: matchedPage.path,
                        response: `Opening ${matchedPage.name}`
                    });
                }
            }
        }

        const prompt = `
You are ${user.assistantName}.

Business Name: ${user.businessName}

Business Type: ${user.businessType}

Business Description: ${user.businessDescription}

Assistant Tone: ${user.tone}

Rules:
- Keep replies under 100 words.
- Give fast, direct responses.
- Talk naturally.
- Behave like a smart voice assistant.
- Avoid long explanations.
- Keep responses short for quick voice playback.

User Question:
${message}
`;

        const aiResponse = await generateGeminiResponse(
           { prompt,
            apiKey: user.geminiApikey,
            user }
        );

        if (user.plan === "free") {
            user.totalMessages += 1;
            await user.save();
        }

        return res.json({
            success: true,
            response: aiResponse
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Assistant AI Error"
        });
    }
};