import { ai } from "../services/gemini.js";
import { pool } from "../db/index.js";
import imagekit from "../services/imagekit.js";
import fs from "fs"

// generating blog titles
export const generateTitle = async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({
                success: false,
                message: "Topic is required"
            })
        }

        const prompt = `
                You are helping an admin create blog titles.
                Topic: "${topic}"
                Generate 5 engaging blog titles that:
                - Are clear and specific
                - Sound natural and human-written
                - Include benefits or outcomes
                - Are suitable for a public blog
                Avoid generic words like "guide", "tips", or "perfecting".
                Return only the titles, each on a new line.`;

        const responseAi = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        const titles = responseAi.text.trim().split("\n").map(title => title.trim());
        res.json({ success: true, message: "Title generated successfully", titles })


    } catch (error) {
        console.error("Error generating title", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// generating blog contents
export const generateBlogContent = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        })
    }

    try {
        const prompt = `
                You are a professional blog writer. 
                Title: "${title}"
                Write a comprehensive and engaging blog post based on this title. 
                The content should include:
                - A compelling introduction.
                - Detailed sections with informative subheadings.
                - A natural, conversational, yet professional tone.
                - A concluding summary.
                Format the entire response in Markdown, starting with the title as an H1 heading.`;

        const responseAi = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        const content = responseAi.text;
        res.json({ success: true, message: "Blog content generated successfully", content })

    } catch (error) {
        console.error("Error generating blog content", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}

// generating a blog image 
export const generateBlogImg = async (req, res) => {
    try {
        const blogId = req.params.id;
        const findBlogById = await pool.query(`SELECT title FROM blogs WHERE id=$1`, [blogId]);
        if (findBlogById.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        const findBlogTitle = findBlogById.rows[0].title;
        const prompt = `
Create a high-quality, realistic featured image for a blog titled:
"${findBlogTitle}"

Style guidelines:
- Photorealistic or realistic illustration
- Clean, modern, professional look
- No text, no words, no logos in the image
- Suitable for a public blog website
- Soft lighting, balanced composition
- Visually represents the topic naturally

The image should look like a professional blog cover image.
`;

        const responseAi = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: prompt,
            config: {
                imageConfig: {
                    aspectRatio: "16:9"
                }
            }
        })
        // 4. Extract image from Gemini response (copied from the doc)
        const imagePart = responseAi.candidates[0].content.parts.find(
            part => part.inlineData
        );

        if (!imagePart) {
            return res.status(400).json({
                success: false,
                message: "Image not found"
            })
        }
        const imageBuffer = Buffer.from(
            imagePart.inlineData.data,
            "base64"
        );

        const imagekitUpload = await imagekit.upload({
            file: imageBuffer,
            fileName: `${blogId}.png`,
            folder: "/blogs"
        })
        const imageUrl = imagekitUpload.url;

        await pool.query(`UPDATE blogs 
            SET image_url=$1 
            WHERE id=$2`, [imageUrl, blogId])

        res.json({
            success: true,
            message: "Image generated successfully",
            imageUrl
        })
    } catch (error) {
        console.error("Image generation error", error);
        res.json({
            success: false,
            message: "Image generation failed"
        })

    }
}