# PDF Generator with AI Summary

This project demonstrates how to generate a PDF file with a summary powered by Google's Gemini Generative AI. Users can input text or paragraphs into a form, and the application will create a PDF containing their input and an AI-generated summary.

---

## Features

- **AI-Powered Summary:** Utilizes Google's Gemini Generative AI to generate a concise summary from user input.
- **Professional PDF Output:** Generates a well-styled, multi-section PDF containing user input and the AI-generated summary.
- **Easy-to-Use Interface:** Simple, responsive form with a clean design for input.

---

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/SrijanSingh9/AI-Summariser.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pdf-generator-ai
   ```
3. Open `index.html` in your browser.

   > Note: Ensure an active internet connection to fetch required libraries like `jsPDF` and `jspdf-autotable`.

---

## Installation (Optional for Node.js Version)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```

---

## Important Notice

🚨 **Please do not use the API key provided in this repository as it is only for representation purposes.**  
It would be greatly appreciated if you use your own API key. Obtaining an API key is free from ai.google.dev.  

To get your API key:
1. Visit [Gemini Studio](https://ai.google.dev/).
2. Sign in with your Google account.
3. Navigate to the API key section and generate your own free key.

Replace the placeholder in `index.js`:
```javascript
const apiKey = "Your API Key :>";
```

---

## Technologies Used

- **HTML5 and CSS3:** For structuring and styling the web interface.
- **JavaScript {Node.js} (jsPDF & jsPDF-AutoTable):** For creating and styling PDF files.
- **Google Gemini Generative AI:** For generating AI-powered summaries.

---
