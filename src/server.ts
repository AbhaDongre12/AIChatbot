import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
);

app.post("/chat", async (req, res) => {

    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview"
    });

    const result = await model.generateContent(
        req.body.message
    );

    res.json({
        reply: result.response.text()
    });
});

app.listen(3000, () => {
    console.log("Server running");
});