// resumeController.js
import axios from 'axios';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');
import Student from '../models/studentModel.js'
import { GoogleGenAI } from "@google/genai";

// Helper: retry with exponential backoff for transient errors (503, etc.)
const generateContentWithRetry = async (ai, params, retries = 1, baseDelay = 1000) => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await ai.models.generateContent(params);
        } catch (err) {
            const status = err?.status || err?.error?.code;
            const isRetryable = status === 503 || status === 429;

            if (isRetryable && attempt < retries - 1) {
                const delay = baseDelay * Math.pow(2, attempt);
                console.warn(`Gemini call failed (status ${status}), retrying in ${delay}ms... (attempt ${attempt + 1}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw err;
        }
    }
};

// NEW: Helper: try multiple models in order if one is overloaded
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

const generateWithFallback = async (ai, contents) => {
    let lastErr;
    for (const model of MODELS) {
        try {
            return await generateContentWithRetry(ai, { model, contents });
        } catch (err) {
            lastErr = err;
            console.warn(`Model ${model} failed, trying next model...`);
        }
    }
    throw lastErr; // all models failed
};

export const analyzeResume = async (req, res) => {
    try {
        const student = await Student.findById(req.student._id);
        console.log("STUDENT +", student);
        console.log("RESUME URL =", student.resume);

        const pdfResponse = await axios.get(
            student.resume,
            {
                responseType: "arraybuffer"
            }
        );

        console.log("PDF DOWNLOADED");

        const pdfData = await pdfParse(
            pdfResponse.data
        );

        console.log("PDF PARSED");

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const resumeText = pdfData.text;

        console.log(
            resumeText.substring(0, 300)
        );

        const prompt = `
Analyze the following resume and return ONLY valid JSON.

Rules:

- Return only JSON.
- Do not add explanations.
- Do not add markdown.
- Do not use \`\`\`json.
- Do not include any text outside JSON.
- Resume Score and ATS Score must be numbers between 0 and 100.
- Include ALL strengths found in the resume.
- Include ALL weaknesses found in the resume.
- Include ALL missing skills relevant to the candidate's target role.
- Include ALL useful suggestions for improvement.
- Do not limit the number of items in any array.
- Be detailed, accurate, and comprehensive.
- finalVerdict must be a professional summary of 3 to 5 sentences.

Return JSON in this exact structure:

{
  "resumeScore": 0,
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestedImprovements": [],
  "finalVerdict": ""
}

Scoring Guidelines:

- Evaluate resume content quality.
- Evaluate project quality and relevance.
- Evaluate technical skills.
- Evaluate ATS friendliness.
- Evaluate formatting and structure.
- Evaluate role relevance.
- Evaluate experience level.
- Evaluate achievements, impact, and measurable outcomes.
- Evaluate overall employability for the candidate's target role.

Resume:
${resumeText}
`;

        // CHANGED: use fallback chain instead of calling generateContentWithRetry directly
        const response = await generateWithFallback(ai, prompt);

        const parsedResult = JSON.parse(response.text);
        
        return res.json(parsedResult);
    } catch (err) {
        console.error(err);

        const status = err?.status || err?.error?.code;

        if (status === 503) {
            return res.status(503).json({
                message: "Resume analysis is temporarily unavailable due to high demand. Please try again in a moment."
            });
        }

        if (status === 429) {
            return res.status(429).json({
                message: "Too many requests right now. Please wait a moment and try again."
            });
        }

        res.status(500).json({ message: "Error analyzing resume" });
    }
};