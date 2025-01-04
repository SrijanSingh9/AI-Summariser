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
async function generatePDF() {
    const userInputs = document.getElementById("userInputs").value;
  
    // Send user inputs to the server to generate a summary
    const response = await fetch("/generate-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInputs }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      const summary = data.summary;
      createPDF(summary, userInputs);
    } else {
      console.error(data.error);
      alert("Failed to generate AI summary.");
    }
  }
  
  function createPDF(summary, userInputs) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
  
    // Add a header to the PDF
    function addHeader(title) {
      pdf.setFontSize(18);
      pdf.setTextColor(40, 40, 40);
      pdf.text(title, pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(200, 200, 200);
      pdf.line(10, 25, pdf.internal.pageSize.getWidth() - 10, 25); // Line below header
    }
  
    // Add a footer to the PDF
    function addFooter(pageNumber) {
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(200, 200, 200);
      pdf.line(10, pageHeight - 15, pdf.internal.pageSize.getWidth() - 10, pageHeight - 15); // Line above footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Page ${pageNumber}`, pdf.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: "center" });
    }
  
    // Add content with proper formatting
    function addContent(title, content, startY) {
      pdf.setFontSize(14);
      pdf.setTextColor(60, 60, 60);
      pdf.text(title, 10, startY);
  
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
      const contentLines = pdf.splitTextToSize(content, pdf.internal.pageSize.getWidth() - 20);
      pdf.text(contentLines, 10, startY + 10);
    }
  
    // Page 1: Summary
    addHeader("AI-Generated Summary Document");
    addContent("Summary", summary, 35);
    addFooter(1);
  
    // Page 2: User Inputs
    pdf.addPage();
    addHeader("Full Paragraph/Text");
    addContent("User Input", userInputs, 35);
    addFooter(2);
  
    // Save the PDF
    pdf.save("ProfessionalGeneratedDocument.pdf");
  }
  