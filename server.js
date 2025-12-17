import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"; // 1. Eklendi: CORS paketi

dotenv.config();

const app = express();

// 2. Tarayıcıdan gelen isteklere izin ver
app.use(cors()); 
app.use(express.json());

// Google Gemini API URL
const API_URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/";

app.post("/api/request", async (req, res) => {
  // Frontend'den gelen veriyi alıyoruz
  const { model, input } = req.body; 

  // Eğer model gelmezse varsayılan olarak gemini-1.5-flash kullanalım
  const targetModel = model || "gemini-1.5-flash"; 

  try {
    // 3. API Key URL parametresi olarak eklenmeli (?key=...)
    // 4. Endpoint 'generateContent' olmalı
    const response = await fetch(`${API_URL_BASE}${targetModel}:generateContent?key=${process.env.API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // 5. Gemini API'sinin beklediği doğru JSON formatı budur:
      body: JSON.stringify({
        contents: [{
          parts: [{ text: input }]
        }]
      })
    });

    const data = await response.json();

    // Hata varsa terminale yazdıralım ki görebilesiniz
    if (data.error) {
        console.error("Google API Hatası:", data.error);
        return res.status(400).json(data);
    }

    res.json(data);

  } catch (err) {
    console.error("Sunucu Hatası:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));