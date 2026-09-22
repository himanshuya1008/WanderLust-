import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import {v2 as cloudinary} from 'cloudinary'
import axios from "axios";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";


const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit exceeded. Please upgrade to premium plan.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });
    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit exceeded. Please upgrade to premium plan.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });
    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};



export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

  const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    });
    const base64Image =`data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

   const {secure_url}= await cloudinary.uploader.upload(base64Image)

  await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    
    res.json({ success: true, content:secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};



export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image=req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }



   const {secure_url}= await cloudinary.uploader.upload(image.path,{
    transformation:[{
      effect:"background_removal",
      background_removal:"remove_the_background"
    }]
   })

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${'Remove background from image'}, ${secure_url}, 'image')`;

    
    res.json({ success: true, content:secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message+"Rishabh" });
  }
};


export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image=req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }



   const {public_id}= await cloudinary.uploader.upload(image.path)
   const imageUrl=cloudinary.url(public_id, {
    transformation:[{
      effect:`gen_remove:${object}`}],
        resource_type:"image"
   })


  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    
    res.json({ success: true, content:imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};


export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    
    const resume =req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }



  if(resume.size>5*1024*1024){
    return res.json({ success: true, message:"Resume file size exceeds.Allowed size is 5MB." });
  }

  const dataBuffer=fs.readFileSync(resume.path)
  const pdfData= await pdf(dataBuffer)
  const prompt=`Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.Resume Content:\n\n${pdfData.text}`
  const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content =response.choices[0].message.content;

  await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    
    res.json({ success: true, content:content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error.message });
  }
};

export const generateTravelItinerary = async (req, res) => {
  try {
    const { destination, days = 3, vibe = "Adventure & Relaxation", budget = "Moderate", travelers = "2 Travelers" } = req.body;

    const prompt = `You are WanderAI, the world's most sophisticated and knowledgeable luxury travel concierge and itinerary planner.
Create a rich, beautifully structured, day-by-day vacation itinerary and travel guide for:
- Destination: ${destination}
- Duration: ${days} Days
- Travel Vibe: ${vibe}
- Budget Tier: ${budget}
- Group: ${travelers}

Format your output with rich Markdown headings, bullet points, time slots (Morning, Afternoon, Evening, Nightlife/Sunset), top local dining gems, hidden photo spots, and practical cultural/packing tips. Make it inspiring, elegant, and actionable.`;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "") {
      const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.75,
        max_tokens: 1500,
      });
      const content = response.choices[0].message.content;
      return res.json({ success: true, content, destination });
    }

    // Curated fallback itinerary when GEMINI_API_KEY is not configured
    const sampleItinerary = `## ✈️ Custom WanderLust Itinerary: ${destination || "Amalfi Coast & Capri"} (${days} Days)

### 🌟 Trip Overview
* **Vibe:** ${vibe}
* **Travelers:** ${travelers}
* **Budget:** ${budget}

---

### 🌅 Day 1: Arrival, Scenic Welcome & Golden Hour
* **Morning:** Arrival at your luxury stay, check-in, unpack, and enjoy an espresso on the sun terrace.
* **Afternoon:** Stroll through the charming cobbled alleys, visiting local artisan boutique shops and ceramic galleries.
* **Sunset:** Savor handcrafted cocktails at the cliffside panorama lounge overlooking the sparkling coastline.
* **Evening:** Intimate candlelit dinner at a Michelin-recommended seafood trattoria serving freshly caught grilled catch and house-made pasta.

---

### 🌊 Day 2: Signature Excursions & Hidden Gems
* **Morning:** Private chartered wooden boat excursion around the coastal sea caves and secret swimming coves.
* **Afternoon:** Light picnic lunch on board featuring regional cheeses, fresh figs, and chilled local wine.
* **Late Afternoon:** Guided visit to a historic lemon orchard with limoncello tasting.
* **Evening:** Traditional wood-fired pizza masterclass or dining under the stars.

---

### 🌺 Day 3: Cultural Immersion & Relaxing Farewell
* **Morning:** Sunrise yoga or scenic cliffside hike along the panoramic trails.
* **Afternoon:** Relaxing afternoon at a private beach club with comfortable daybeds and emerald water access.
* **Evening:** Farewell sunset dinner at a historic clifftop estate, reflecting on unforgettable memories.

---

### 💡 WanderLust Insider Tips
1. **Best Photo Spot:** Clifftop viewpoint at 6:45 PM for golden-hour illumination.
2. **Local Delicacy:** Ask for the seasonal chef's special pasta with fresh herbs.
3. **Getting Around:** Reserve private transfers or vintage scooter rentals in advance for seamless travel.`;

    return res.json({ success: true, content: sampleItinerary, destination: destination || "Amalfi Coast" });
  } catch (error) {
    console.error("generateTravelItinerary error:", error);
    res.json({ success: false, error: error.message });
  }
};