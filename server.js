import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Dosya yollarını tanımlıyoruz (ES Module ayarı)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// 1. ÖNEMLİ: Ana dizindeki dosyaları (index.html, assets vs.) dışarıya aç
// index.html senin ana klasöründe olduğu için __dirname kullanıyoruz.
app.use(express.static(__dirname));

// Google Gemini API URL
const API_URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models/";

// API Endpoint
app.post("/api/request", async (req, res) => {
  const { model, input } = req.body;
  const targetModel = model || "gemini-1.5-flash";

  try {
    const response = await fetch(`${API_URL_BASE}${targetModel}:generateContent?key=${process.env.API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: input }]
        }]
      })
    });

    const data = await response.json();

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

// 2. ÖNEMLİ: Siteye giren herkesi index.html'e yönlendir
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 3. ÖNEMLİ: Render'ın verdiği portu kullan, yoksa 3000'i kullan
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));