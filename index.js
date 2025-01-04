const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const apiKey = "AIzaSyARtwMOt8j822f7a6_M3yoMtoEZ6TGcNeQ";

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(apiKey);

app.post("/generate-summary", async (req, res) => {
  try {
    const { userInputs } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a summary based on the following sections:\n\n${userInputs}`;
    const result = await model.generateContent(prompt);
    res.json({ summary: result.response.text() });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
