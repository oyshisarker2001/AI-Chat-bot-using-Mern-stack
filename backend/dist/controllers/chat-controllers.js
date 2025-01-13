import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";
import { randomUUID } from "crypto";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        // Convert user chats to the correct format for OpenAI API
        const chats = user.chats.map((chat) => ({
            role: chat.role, // Explicit typing
            content: chat.content,
        }));
        // Add the new user message to the chats array
        const userMessage = {
            id: randomUUID(), // Generate unique ID for the message
            role: "user",
            content: message,
        };
        chats.push({ role: "user", content: message }); // Include new message in OpenAI API request
        user.chats.push(userMessage); // Save new message in the database
        // Configure OpenAI client
        const openai = new OpenAI(configureOpenAI());
        // Make the API call to get chat completion
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats, // Pass the correct message array
        });
        // Extract the assistant's response from the OpenAI API response
        const assistantResponse = chatResponse.choices[0].message;
        if (!assistantResponse || !assistantResponse.content) {
            return res.status(500).json({ message: "Invalid response from OpenAI" });
        }
        // Create assistant message object and save it to user chats
        const assistantMessage = {
            id: randomUUID(),
            role: assistantResponse.role,
            content: assistantResponse.content,
        };
        // Save the assistant's response to the user's chats
        user.chats.push(assistantMessage);
        await user.save();
        // Return the updated chats
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map