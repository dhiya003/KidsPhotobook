import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI client lazily
  let aiClient: GoogleGenAI | null = null;
  function getAiClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // Check AI connection status
  app.get('/api/ai/status', (req, res) => {
    const hasKey = !!process.env.GEMINI_API_KEY;
    res.json({
      connected: hasKey,
      model: 'gemini-3.8-flash',
      provider: 'Google Gemini'
    });
  });

  // Helper to execute Gemini with a strict timeout
  async function callGeminiWithTimeout(promise: Promise<any>, timeoutMs: number = 1500): Promise<any> {
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('AI generation timeout')), timeoutMs);
    });
    try {
      const result = await Promise.race([promise, timeoutPromise]);
      clearTimeout(timer!);
      return result;
    } catch (err) {
      clearTimeout(timer!);
      throw err;
    }
  }

  // AI Story Personalization API
  app.post('/api/ai/personalize-story', async (req, res) => {
    try {
      const {
        childName,
        childAge,
        storyTitle,
        category,
        favoriteColor,
        favoriteAnimal,
        favoriteActivity,
        language,
        pages
      } = req.body;

      const ai = getAiClient();
      if (!ai) {
        return res.status(200).json({
          success: false,
          fallback: true,
          message: 'Using instant template personalization engine.'
        });
      }

      const prompt = `You are a children's story author for Verve Studio.
Story: "${storyTitle}" (Theme: ${category})
Child: ${childName || 'Hero'}, age ${childAge || 5}, favorite color ${favoriteColor || 'blue'}, animal companion ${favoriteAnimal || 'little cub'}.
Write 4 short warm story paragraphs (2-3 sentences each) for pages 1 to 4 where ${childName} is the hero.
Return JSON:
{"scenes": [{"pageNumber": 1, "sceneTitle": "...", "text": "..."}]}`;

      const response = await callGeminiWithTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          }
        }),
        1500
      );

      const responseText = response.text || '{}';
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr) {
        parsed = null;
      }

      if (parsed && Array.isArray(parsed.scenes)) {
        return res.json({
          success: true,
          scenes: parsed.scenes,
          modelUsed: 'gemini-3.8-flash'
        });
      }

      return res.json({ success: false, fallback: true });
    } catch (err: any) {
      // Return instant fallback so client never waits
      res.json({
        success: false,
        fallback: true,
        message: 'Using instant template personalization engine.'
      });
    }
  });

  // AI Dedication Generation API
  app.post('/api/ai/suggest-dedication', async (req, res) => {
    try {
      const { childName, childAge, dedicationFrom, tone } = req.body;
      const ai = getAiClient();

      if (!ai) {
        return res.json({
          dedication: `For our dearest ${childName || 'sweet child'}, may your life always be full of wonder, boundless courage, and joyful laughter.`
        });
      }

      const prompt = `Write a touching, heartfelt 2-sentence dedication note from "${dedicationFrom || 'Mum & Dad'}" to their child "${childName || 'darling'}" (age ${childAge || 5}) for a personalized book. Tone: ${tone || 'loving, warm, and inspiring'}. Only return the dedication text without quotes.`;

      const response = await callGeminiWithTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.8
          }
        }),
        1500
      );

      const dedication = response.text?.trim() || `For our wonderful ${childName}, may your heart always be brave and your adventures endless.`;
      res.json({ dedication });
    } catch (err: any) {
      res.json({
        dedication: `For our dearest ${req.body?.childName || 'child'}, may your courage shine bright across every page of your life.`
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verve Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
