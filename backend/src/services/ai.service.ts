import OpenAI from "openai";
import { z } from "zod";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const jobSchema = z.object({
    company: z.string(),
    role: z.string(),
    requiredSkills: z.array(z.string()),
    niceToHaveSkills: z.array(z.string()).optional(),
    seniority: z.string().optional(),
    location: z.string().optional()
});

// Parse Job Description
export const parseJobDescription = async (jd: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Extract structured job data in JSON."
        },
        {
          role: "user",
          content: `
            Extract:
            - company
            - role
            - requiredSkills (array)
            - niceToHaveSkills (array)
            - seniority
            - location

            Return ONLY JSON.

            ${jd}
          `
        }
      ]
    });

    const content = response.choices[0].message.content;

    if (!content) {
      console.error("Empty AI response");
      throw new Error("Empty AI response");
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("JSON parse error:", content);
      throw new Error("Invalid JSON from AI");
    }

    return parsed;

  } catch (err: any) {
    console.error("AI ERROR:", err.message);
    throw new Error("AI parsing failed");
  }
};

// Generate Resume Points
export const generateResumePoints = async (data: any) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You generate strong resume bullet points."
        },
        {
          role: "user",
          content: `
Generate 3-5 impactful resume bullet points for this role:

Role: ${data.role}
Company: ${data.company}
Skills: ${data.requiredSkills?.join(", ")}

Make them specific, achievement-oriented, and not generic.
          `
        }
      ]
    });

    return response.choices[0].message.content;

  } catch {
    throw new Error("Resume generation failed");
  }
};