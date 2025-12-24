import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Activity, Search, ChevronDown, DollarSign, Calendar, 
  Check, Zap, Hash, Tag, Flame, Code, Sparkles, MessageSquare, 
  BarChart3, X, Send, Cpu, Layers, ArrowUpRight, Globe, PenTool,
  TrendingUp, Info
} from 'lucide-react';

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc', label: 'Rank' });
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiMode, setAiMode] = useState('report'); 
  const [aiOutput, setAiOutput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setActiveMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiOutput]);

  // Complete 2025 Data
  // Mapped strictly to user requirements:
  // SWE-bench: 34 entries.
  // LiveBench: Global Average scores.
  // LLM Arena: Top 32 entries.
  // DesignArena: Specific 15-model sequence.
  const leaderboardData = [
    // --- TOP TIER ---
    { 
      rank: 1, 
      commonName: "Claude 4.5 Opus (Thinking)",
      provider: "Anthropic", 
      swe: { name: "Claude 4.5 Opus medium (20251101)", score: 74.40 },
      live: { name: "Claude 4.5 Opus Thinking High Effort", score: 75.58 },
      arena: { name: "claude-opus-4-5-20251101-thinking-32k", score: 1522 },
      design: null 
    },
    { 
      rank: 2, 
      commonName: "Gemini 3 Pro",
      provider: "Google DeepMind", 
      swe: { name: "Gemini 3 Pro Preview (2025-11-18)", score: 74.20 },
      live: { name: "Gemini 3 Pro Preview High", score: 74.86 },
      arena: { name: "gemini-3-pro", score: 1479 },
      design: { name: "Gemini 3 Pro", score: 1379 }
    },
    { 
      rank: 3, 
      commonName: "GPT-5.2 (High)",
      provider: "OpenAI", 
      swe: { name: "GPT-5.2 (2025-12-11) (high reasoning)", score: 71.80 },
      live: { name: "GPT-5.2 High", score: 73.61 },
      arena: { name: "gpt-5.2-high", score: 1484 },
      design: { name: "GPT-5.2 (xHigh)", score: 1301 }
    },
    { 
      rank: 4, 
      commonName: "Claude 4.5 Sonnet",
      provider: "Anthropic", 
      swe: { name: "Claude 4.5 Sonnet (20250929)", score: 70.60 },
      live: { name: "Claude Sonnet 4.5", score: 59.93 },
      arena: { name: "claude-sonnet-4-5-20250929-thinking-32k", score: 1394 },
      design: { name: "Claude Sonnet 4.5", score: 1294 } 
    },
    { 
      rank: 5, 
      commonName: "GPT-5.2",
      provider: "OpenAI", 
      swe: { name: "GPT-5.2 (2025-12-11)", score: 69.00 },
      live: { name: "GPT-5.2 No Thinking", score: 53.59 },
      arena: { name: "gpt-5.2", score: 1398 },
      design: { name: "GPT-5.2 (None)", score: 1288 } 
    },
    { 
      rank: 6, 
      commonName: "GLM-4.7",
      provider: "Z.ai", 
      swe: null,
      live: null,
      arena: { name: "glm-4.7", score: 1449 },
      design: { name: "GLM 4.7", score: 1347 } 
    },
    { 
      rank: 7, 
      commonName: "Claude 4 Opus",
      provider: "Anthropic", 
      swe: { name: "Claude 4 Opus (20250514)", score: 67.60 },
      live: null,
      arena: { name: "claude-opus-4-5-20251101", score: 1480 },
      design: { name: "Claude Opus 4", score: 1284 }
    },
    { 
      rank: 8, 
      commonName: "GPT-5.1 Codex",
      provider: "OpenAI", 
      swe: { name: "GPT-5.1-codex (medium reasoning)", score: 66.00 },
      live: { name: "GPT-5.1 Codex", score: 70.84 },
      arena: { name: "gpt-5.1-codex", score: 1334 },
      design: null 
    },
    { 
      rank: 9, 
      commonName: "GPT-5.1",
      provider: "OpenAI", 
      swe: { name: "GPT-5.1 (2025-11-13) (medium reasoning)", score: 66.00 },
      live: { name: "GPT-5.1 High", score: 72.52 },
      arena: { name: "gpt-5.1", score: 1358 },
      design: { name: "GPT-5.1 (None)", score: 1271 }
    },
    { 
      rank: 10, 
      commonName: "GPT-5",
      provider: "OpenAI", 
      swe: { name: "GPT-5 (2025-08-07) (medium reasoning)", score: 65.00 },
      live: null,
      arena: { name: "gpt-5-medium", score: 1398 },
      design: { name: "GPT-5 (Minimal)", score: 1290 }
    },
    { 
      rank: 11, 
      commonName: "Claude 4 Sonnet",
      provider: "Anthropic", 
      swe: { name: "Claude 4 Sonnet (20250514)", score: 64.93 },
      live: { name: "Claude 4 Sonnet", score: 56.83 },
      arena: null, 
      design: { name: "Claude 4 Sonnet", score: 1250 }
    },
    { 
      rank: 12, 
      commonName: "Kimi K2 Thinking",
      provider: "Moonshot AI", 
      swe: { name: "Kimi K2 Thinking", score: 63.40 },
      live: { name: "Kimi K2 Thinking", score: 65.85 },
      arena: { name: "kimi-k2-thinking-turbo", score: 1341 },
      design: null
    },
    { 
      rank: 13, 
      commonName: "Minimax M2",
      provider: "Minimax", 
      swe: { name: "Minimax M2", score: 61.00 },
      live: null,
      arena: { name: "minimax-m2", score: 1315 },
      design: null
    },
    { 
      rank: 14, 
      commonName: "DeepSeek V3.2 (Thinking)",
      provider: "DeepSeek", 
      swe: { name: "DeepSeek V3.2 Reasoner", score: 60.00 },
      live: { name: "DeepSeek V3.2 Thinking", score: 66.61 },
      arena: { name: "deepseek-v3.2-thinking", score: 1369 },
      design: null
    },
    { 
      rank: 15, 
      commonName: "GPT-5 Mini",
      provider: "OpenAI", 
      swe: { name: "GPT-5 mini (2025-08-07) (medium reasoning)", score: 59.80 },
      live: { name: "GPT-5 Mini High", score: 69.33 },
      arena: null,
      design: { name: "GPT-5 Mini", score: 1255 }
    },
    { 
      rank: 16, 
      commonName: "o3",
      provider: "OpenAI", 
      swe: { name: "o3 (2025-04-16)", score: 58.40 },
      live: null,
      arena: null,
      design: { name: "o3", score: 1270 }
    },
    { 
      rank: 17, 
      commonName: "Devstral Small",
      provider: "Mistral", 
      swe: { name: "Devstral small (2512)", score: 56.40 },
      live: null,
      arena: { name: "devstral-medium-2507", score: 1101 },
      design: { name: "Devstral Small", score: 1190 }
    },
    { 
      rank: 18, 
      commonName: "Qwen3 Coder",
      provider: "Qwen", 
      swe: { name: "Qwen3-Coder 480B/A35B Instruct", score: 55.40 },
      live: { name: "Qwen3-Coder", score: 4.9 },
      arena: { name: "qwen3-coder-480b-a35b-instruct", score: 1289 },
      design: null
    },
    { 
      rank: 19, 
      commonName: "GLM 4.6",
      provider: "Z.ai", 
      swe: { name: "GLM-4.6 (T=1)", score: 55.40 },
      live: { name: "GLM 4.6", score: 59.6 },
      arena: { name: "glm-4.6", score: 1366 },
      design: { name: "GLM 4.6", score: 1278 }
    },
    { 
      rank: 20, 
      commonName: "GLM-4.5",
      provider: "Z.ai", 
      swe: { name: "GLM-4.5 (2025-08-22)", score: 54.20 },
      live: null,
      arena: null,
      design: { name: "GLM 4.5", score: 1268 } 
    },
    { 
      rank: 21, 
      commonName: "Devstral",
      provider: "Mistral", 
      swe: { name: "Devstral (2512)", score: 53.80 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 22, 
      commonName: "Gemini 2.5 Pro",
      provider: "Google DeepMind", 
      swe: { name: "Gemini 2.5 Pro (2025-05-06)", score: 53.60 },
      live: { name: "Gemini 2.5 Pro (Max Thinking)", score: 62.23 },
      arena: { name: "gemini-2.5-pro", score: 1212 },
      design: null
    },
    { 
      rank: 23, 
      commonName: "Claude 3.7 Sonnet",
      provider: "Anthropic", 
      swe: { name: "Claude 3.7 Sonnet (20250219)", score: 52.80 },
      live: null,
      arena: null,
      design: { name: "Claude 3.7 Sonnet", score: 1279 }
    },
    { 
      rank: 24, 
      commonName: "o4-mini",
      provider: "OpenAI", 
      swe: { name: "o4-mini (2025-04-16)", score: 45.00 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 25, 
      commonName: "Kimi K2 Instruct",
      provider: "Moonshot AI", 
      swe: { name: "Kimi K2 Instruct", score: 43.80 },
      live: { name: "Kimi K2 Instruct", score: 52.84 },
      arena: null,
      design: null
    },
    { 
      rank: 26, 
      commonName: "GPT-4.1",
      provider: "OpenAI", 
      swe: { name: "GPT-4.1 (2025-04-14)", score: 39.58 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 27, 
      commonName: "GPT-5 Nano",
      provider: "OpenAI", 
      swe: { name: "GPT-5 nano (2025-08-07) (medium reasoning)", score: 34.80 },
      live: { name: "GPT-5 Nano", score: 54.24 },
      arena: null,
      design: null
    },
    { 
      rank: 28, 
      commonName: "Gemini 2.5 Flash",
      provider: "Google DeepMind", 
      swe: { name: "Gemini 2.5 Flash (2025-04-17)", score: 28.73 },
      live: { name: "Gemini 2.5 Flash (Max Thinking) (2025-09-25)", score: 55.95 },
      arena: null,
      design: null
    },
    { 
      rank: 29, 
      commonName: "GPT-OSS 120B",
      provider: "OpenAI", 
      swe: { name: "gpt-oss-120b", score: 26.00 },
      live: { name: "GPT OSS 120b", score: 51.66 },
      arena: null,
      design: null
    },
    { 
      rank: 30, 
      commonName: "GPT-4.1 Mini",
      provider: "OpenAI", 
      swe: { name: "GPT-4.1-mini (2025-04-14)", score: 23.94 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 31, 
      commonName: "GPT-4o",
      provider: "OpenAI", 
      swe: { name: "GPT-4o (2024-11-20)", score: 21.62 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 32, 
      commonName: "Llama 4 Maverick",
      provider: "Meta", 
      swe: { name: "Llama 4 Maverick Instruct", score: 21.04 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 33, 
      commonName: "Gemini 2.0 Flash",
      provider: "Google DeepMind", 
      swe: { name: "Gemini 2.0 flash", score: 13.52 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 34, 
      commonName: "Llama 4 Scout",
      provider: "Meta", 
      swe: { name: "Llama 4 Scout Instruct", score: 9.06 },
      live: null,
      arena: null,
      design: null
    },
    { 
      rank: 35, 
      commonName: "Qwen2.5 Coder",
      provider: "Qwen", 
      swe: { name: "Qwen2.5-Coder 32B Instruct", score: 9.00 },
      live: null,
      arena: null,
      design: null
    },

    // --- OTHER MODELS ---
    { 
      rank: 36, 
      commonName: "GPT-5.1 Codex (XHigh)",
      provider: "OpenAI", 
      swe: null,
      live: { name: "GPT-5.1 Codex Max XHigh", score: 76.21 },
      arena: null,
      design: null
    },
    { 
      rank: 37, 
      commonName: "Gemini 3 Flash",
      provider: "Google DeepMind", 
      swe: null,
      live: { name: "Gemini 3 Flash Preview High", score: 73.62 },
      arena: { name: "gemini-3-flash", score: 1470 },
      design: { name: "Gemini 3 Flash Preview", score: 1290 } 
    },
    { 
      rank: 38, 
      commonName: "GPT-5 Pro",
      provider: "OpenAI", 
      swe: null,
      live: { name: "GPT-5 Pro", score: 73.48 },
      arena: null,
      design: null
    },
    { 
      rank: 39, 
      commonName: "Claude 4.5 Sonnet (Thinking)",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude Sonnet 4.5 Thinking", score: 71.83 },
      arena: { name: "claude-sonnet-4-5-20250929-thinking-32k", score: 1394 },
      design: { name: "Claude 4.5 Sonnet (Thinking)", score: 1300 }
    },
    { 
      rank: 40, 
      commonName: "Claude Opus 4.1 (Thinking)",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude 4.1 Opus Thinking", score: 66.86 },
      arena: null,
      design: { name: "Claude Opus 4.1 (Thinking)", score: 1287 } 
    },
    { 
      rank: 41, 
      commonName: "Claude 4 Sonnet (Thinking)",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude 4 Sonnet Thinking", score: 65.42 },
      arena: null,
      design: null
    },
    { 
      rank: 42, 
      commonName: "GPT-5.1 Codex Mini",
      provider: "OpenAI", 
      swe: null,
      live: { name: "GPT-5.1 Codex Mini", score: 65.03 },
      arena: { name: "gpt-5.1-codex-mini", score: 1250 },
      design: null
    },
    { 
      rank: 43, 
      commonName: "Claude 4.5 Opus",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude 4.5 Opus Medium Effort", score: 64.79 },
      arena: null,
      design: { name: "Claude 4.5 Opus", score: 1341 }
    },
    { 
      rank: 44, 
      commonName: "Claude Haiku 4.5 (Thinking)",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude Haiku 4.5 Thinking", score: 64.28 },
      arena: null,
      design: null
    },
    { 
      rank: 45, 
      commonName: "DeepSeek V3.2 Speciale",
      provider: "DeepSeek", 
      swe: null,
      live: { name: "DeepSeek V3.2 Speciale", score: 63.81 },
      arena: null,
      design: null
    },
    { 
      rank: 46, 
      commonName: "Grok 4",
      provider: "xAI", 
      swe: null,
      live: { name: "Grok 4", score: 63.52 },
      arena: null,
      design: null
    },
    { 
      rank: 47, 
      commonName: "Grok 4.1 (Fast)",
      provider: "xAI", 
      swe: null,
      live: { name: "Grok 4.1 Fast", score: 62.73 },
      arena: { name: "grok-4-1-fast-reasoning", score: 1226 },
      design: null
    },
    { 
      rank: 48, 
      commonName: "DeepSeek V3.2 Exp",
      provider: "DeepSeek", 
      swe: null,
      live: { name: "DeepSeek V3.2 Exp Thinking", score: 62.07 },
      arena: { name: "deepseek-v3.2-exp", score: 1293 },
      design: null
    },
    { 
      rank: 49, 
      commonName: "Claude Opus 4.1",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude 4.1 Opus", score: 58.33 },
      arena: { name: "claude-opus-4-1-20250805", score: 1387 },
      design: { name: "Claude Opus 4.1", score: 1274 } 
    },
    { 
      rank: 50, 
      commonName: "Qwen3 235B (Thinking)",
      provider: "Qwen", 
      swe: null,
      live: { name: "Qwen 3 235B A22B Thinking 2507", score: 57.74 },
      arena: null,
      design: null
    },
    { 
      rank: 51, 
      commonName: "DeepSeek V3.2",
      provider: "DeepSeek", 
      swe: null,
      live: { name: "DeepSeek V3.2", score: 57.38 },
      arena: { name: "deepseek-v3.2", score: 1285 },
      design: null
    },
    { 
      rank: 52, 
      commonName: "DeepSeek V3.2 Exp (Base)",
      provider: "DeepSeek", 
      swe: null,
      live: { name: "DeepSeek V3.2 Exp", score: 55.29 },
      arena: null,
      design: null
    },
    { 
      rank: 53, 
      commonName: "Qwen3 80B (Thinking)",
      provider: "Qwen", 
      swe: null,
      live: { name: "Qwen 3 Next 80B A3B Thinking", score: 54.46 },
      arena: null,
      design: null
    },
    { 
      rank: 54, 
      commonName: "Qwen3 235B (Instruct)",
      provider: "Qwen", 
      swe: null,
      live: { name: "Qwen 3 235B A22B Instruct 2507", score: 53.85 },
      arena: null,
      design: null
    },
    { 
      rank: 55, 
      commonName: "Qwen3 80B (Instruct)",
      provider: "Qwen", 
      swe: null,
      live: { name: "Qwen 3 Next 80B A3B Instruct", score: 53.27 },
      arena: null,
      design: null
    },
    { 
      rank: 56, 
      commonName: "Claude Haiku 4.5",
      provider: "Anthropic", 
      swe: null,
      live: { name: "Claude Haiku 4.5", score: 50.96 },
      arena: { name: "claude-haiku-4-5-20251001", score: 1289 },
      design: null
    },
    { 
      rank: 57, 
      commonName: "Grok Code Fast",
      provider: "xAI", 
      swe: null,
      live: { name: "Grok Code Fast", score: 49.82 },
      arena: { name: "grok-code-fast-1", score: 1142 },
      design: null
    },
    { 
      rank: 58, 
      commonName: "Qwen3 32B",
      provider: "Qwen", 
      swe: null,
      live: { name: "Qwen 3 32B", score: 49.32 },
      arena: null,
      design: null
    },
    { 
      rank: 59, 
      commonName: "Gemini 2.5 Flash Lite",
      provider: "Google DeepMind", 
      swe: null,
      live: { name: "Gemini 2.5 Flash Lite (Max Thinking) (2025-09-25)", score: 48.07 },
      arena: null,
      design: null
    },
    { 
      rank: 60, 
      commonName: "GLM 4.6V",
      provider: "Z.ai", 
      swe: null,
      live: { name: "GLM 4.6V", score: 46.4 },
      arena: null,
      design: null
    },
    { 
      rank: 61, 
      commonName: "Devstral 2",
      provider: "Mistral", 
      swe: null,
      live: { name: "Devstral 2", score: 46.27 },
      arena: null,
      design: null
    },
    { 
      rank: 62, 
      commonName: "Qwen3 30B",
      provider: "Qwen", 
      swe: null,
      live: { name: "Qwen 3 30B A3B", score: 45.44 },
      arena: null,
      design: null
    },
    { 
      rank: 63, 
      commonName: "Grok 4.1 Fast (Non-Reasoning)",
      provider: "xAI", 
      swe: null,
      live: { name: "Grok 4.1 Fast (Non-Reasoning)", score: 39.25 },
      arena: null,
      design: null
    },
    { 
      rank: 64, 
      commonName: "Gemini 3 Flash (Thinking)",
      provider: "Google DeepMind", 
      swe: null,
      live: null,
      arena: { name: "gemini-3-flash (thinking-minimal)", score: 1381 },
      design: null
    },
    { 
      rank: 65, 
      commonName: "KAT Coder Pro",
      provider: "KwaiKAT", 
      swe: null,
      live: null,
      arena: { name: "KAT-Coder-Pro-V1", score: 1263 },
      design: null
    },
    { 
      rank: 66, 
      commonName: "Mistral Large 3",
      provider: "Mistral", 
      swe: null,
      live: null,
      arena: { name: "mistral-large-3", score: 1225 },
      design: null
    },
    { 
      rank: 67, 
      commonName: "Grok 4.1 Thinking",
      provider: "xAI", 
      swe: null,
      live: null,
      arena: { name: "grok-4.1-thinking", score: 1205 },
      design: null
    },
    { 
      rank: 68, 
      commonName: "Grok 4 Fast",
      provider: "xAI", 
      swe: null,
      live: null,
      arena: { name: "grok-4-fast-reasoning", score: 1152 },
      design: null
    },
    { 
      rank: 69, 
      commonName: "Devstral Medium",
      provider: "Mistral", 
      swe: null,
      live: null,
      arena: { name: "devstral-medium-2507", score: 1101 },
      design: null
    },
    { 
      rank: 70, 
      commonName: "GPT-5 (High)",
      provider: "OpenAI", 
      swe: null,
      live: null,
      arena: null,
      design: { name: "GPT-5 (High)", score: 1277 } 
    },
    { 
      rank: 71, 
      commonName: "GPT-5.1 (High)",
      provider: "OpenAI", 
      swe: null,
      live: null,
      arena: null,
      design: { name: "GPT-5.1 (High)", score: 1274 } 
    },
    { 
      rank: 72, 
      commonName: "GPT-5.2 (Low)",
      provider: "OpenAI", 
      swe: null,
      live: null,
      arena: null,
      design: { name: "GPT-5.2 (Low)", score: 1274 } 
    }
  ];

  // --- GEMINI API INTEGRATION ---
  const callGeminiAPI = async (prompt) => {
    const apiKey = ""; // Runtime injection
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    try {
      let response;
      for (let i = 0; i < 3; i++) {
        response = await fetch(url, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (response.ok) break;
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
      }
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "The AI Analyst is currently offline. Please try again later.";
    }
  };

  const handleGenerateReport = async () => {
    setAiLoading(true); setAiOutput('');
    const topModels = leaderboardData.slice(0, 10).map(m => `${m.commonName}: SWE ${m.swe?.score || 'N/A'}, Live ${m.live?.score || 'N/A'}, Arena ${m.arena?.score || 'N/A'}, Design ${m.design?.score || 'N/A'}`).join('\n');
    const prompt = `Act as an elite AI Market Analyst for 2025. Analyze these top LLMs:\n${topModels}\n\nProvide a high-energy, markdown-formatted "Market Pulse" report highlighting: 1. The Undisputed King 👑, 2. The Budget Beast 💎, 3. Critical Market Shift 🚀. Keep it concise.`;
    const result = await callGeminiAPI(prompt);
    setAiOutput(result); setAiLoading(false);
  };

  const handleRecommend = async () => {
    if (!chatInput.trim()) return;
    setAiLoading(true);
    const q = chatInput; setChatInput('');
    setAiOutput(prev => prev ? prev + `\n\n**You:** ${q}\n\n` : `**You:** ${q}\n\n`);
    const context = leaderboardData.map(m => `${m.commonName} (SWE:${m.swe?.score || 'N/A'}, LB:${m.live?.score || 'N/A'}, Arena:${m.arena?.score || 'N/A'}, Design:${m.design?.score || 'N/A'})`).join('; ');
    const prompt = `User asks: "${q}"\nData: [${context}]\nRecommend the best 1-2 models. Be specific and brief.`;
    const result = await callGeminiAPI(prompt);
    setAiOutput(prev => prev + `**Gemini:** ${result}`); setAiLoading(false);
  };

  // --- Sorting & Rendering Logic ---
  const handleSort = (key, direction, label) => {
    setSortConfig({ key, direction, label });
    setActiveMenu(null);
  };

  const filteredData = leaderboardData.filter(m => 
    m.commonName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal, bVal;

    // Handle nested sort keys
    if (sortConfig.key === 'score') {
      aVal = a.swe?.score ?? null;
      bVal = b.swe?.score ?? null;
    } else if (sortConfig.key === 'liveBench') {
      aVal = a.live?.score ?? null;
      bVal = b.live?.score ?? null;
    } else if (sortConfig.key === 'llmArena') {
      aVal = a.arena?.score ?? null;
      bVal = b.arena?.score ?? null;
    } else if (sortConfig.key === 'designArena') {
      aVal = a.design?.score ?? null;
      bVal = b.design?.score ?? null;
    } else if (sortConfig.key === 'rank') {
      aVal = a.rank;
      bVal = b.rank;
    } else {
      aVal = a[sortConfig.key];
      bVal = b[sortConfig.key];
    }

    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;
    
    if (sortConfig.key === 'date') { 
      aVal = new Date(a.date).getTime(); 
      bVal = new Date(b.date).getTime(); 
    }
    
    return sortConfig.direction === 'asc' ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
  });

  const SortOption = ({ active, label, onClick }) => (
    <button onClick={onClick} className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between group transition-all rounded-lg ${active ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
      <span>{label}</span> {active && <Check className="w-3.5 h-3.5" />}
    </button>
  );

  // Helper for rank-based coloring (Cyberpunk Tiers)
  const getTierStyle = (index) => {
    if (index < 5) return { 
        text: 'text-cyan-400', 
        bar: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500', 
        barShadow: 'shadow-[0_0_10px_rgba(34,211,238,0.4)]',
        border: 'group-hover:border-cyan-500/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
    };
    if (index < 10) return { 
        text: 'text-purple-400', 
        bar: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500', 
        barShadow: 'shadow-[0_0_10px_rgba(168,85,247,0.4)]',
        border: 'group-hover:border-purple-500/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]'
    };
    if (index < 15) return { 
        text: 'text-emerald-400', 
        bar: 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500', 
        barShadow: 'shadow-[0_0_10px_rgba(52,211,153,0.4)]',
        border: 'group-hover:border-emerald-500/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]'
    };
    if (index < 20) return { 
        text: 'text-amber-400', 
        bar: 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500', 
        barShadow: 'shadow-[0_0_10px_rgba(251,191,36,0.4)]',
        border: 'group-hover:border-amber-500/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]'
    };
    return { 
        text: 'text-slate-400', 
        bar: 'bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-500', 
        barShadow: 'shadow-[0_0_10px_rgba(148,163,184,0.3)]',
        border: 'group-hover:border-white/20',
        glow: 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
    };
  };

  // --- VISUALIZATION COMPONENT ---
  const TopModelsChart = ({ data }) => {
    // Get Top 3 based on rank
    const top3 = data.filter(m => m.rank <= 3).sort((a, b) => a.rank - b.rank);
    
    const benchmarks = [
      { key: 'swe', label: 'SWE-bench', max: 100, color: 'from-cyan-500 to-blue-500' },
      { key: 'live', label: 'LiveBench', max: 100, color: 'from-purple-500 to-pink-500' },
      { key: 'arena', label: 'LLM Arena', max: 1600, color: 'from-orange-500 to-amber-500' },
      { key: 'design', label: 'DesignArena', max: 1500, color: 'from-pink-500 to-rose-500' }
    ];

    return (
      <div className="mb-10 bg-[#08080C]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />

         <div className="flex items-center gap-3 mb-6 relative z-10">
           <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-white/5">
             <BarChart3 className="w-5 h-5 text-cyan-400" />
           </div>
           <h3 className="text-lg font-bold text-white tracking-wide uppercase">Performance Analysis: Top 3 Models</h3>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
            {benchmarks.map((bench) => (
              <div key={bench.key} className="bg-[#0A0A12]/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-white/10 transition-colors group">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{bench.label}</span>
                    <TrendingUp className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                 </div>
                 
                 <div className="space-y-4">
                   {top3.map((model, idx) => {
                     // Get score. Handle if the benchmark object itself is null or score is missing
                     const rawScore = model[bench.key]?.score || 0;
                     // Normalize height based on max value for that benchmark
                     const percentage = Math.min((rawScore / bench.max) * 100, 100);
                     
                     // Rank Colors
                     const rankColor = idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-300' : 'bg-orange-400';
                     const glowColor = idx === 0 ? 'shadow-yellow-400/20' : idx === 1 ? 'shadow-gray-300/20' : 'shadow-orange-400/20';

                     return (
                       <div key={idx} className="group/bar">
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className={`font-mono ${idx===0?'text-yellow-400':idx===1?'text-gray-300':'text-orange-400'} truncate max-w-[70%]`}>
                              {idx===0 ? '🥇' : idx===1 ? '🥈' : '🥉'} {model.commonName}
                            </span>
                            <span className="font-bold text-gray-300">{rawScore > 0 ? rawScore : 'N/A'}</span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
                             <div 
                               className={`h-full rounded-full bg-gradient-to-r ${bench.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.1)]`} 
                               style={{ width: isLoaded ? `${percentage}%` : '0%' }} 
                             />
                             {/* Rank Indicator Dot */}
                             <div className={`absolute top-0 right-0 h-full w-1 ${rankColor} shadow-[0_0_5px_rgba(255,255,255,0.5)]`} style={{ left: isLoaded ? `${percentage}%` : '0%' }} />
                          </div>
                       </div>
                     );
                   })}
                 </div>
              </div>
            ))}
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-cyan-500/30">
      {/* --- AMBIENT BACKGROUND & NOISE --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Noise Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        {/* Moving Aurora Gradients */}
        <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '12s'}} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '15s'}} />
        <div className="absolute top-[40%] left-[-10%] w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* --- HEADER (Search Only) --- */}
        <div className="mb-8 flex justify-end relative z-30">
           <div className="relative group w-full sm:w-80">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-30 group-focus-within:opacity-60 transition duration-500 blur-md"></div>
            <div className="relative flex items-center bg-[#050508]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
              <Search className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search models..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none py-3 pl-10 pr-4 text-sm focus:ring-0 text-gray-100 placeholder-gray-600"
              />
            </div>
           </div>
        </div>

        {/* --- AI MODAL --- */}
        {showAIModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowAIModal(false)} />
            <div ref={modalRef} className="relative w-full max-w-2xl bg-[#0F0F16] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              {/* ... AI Modal Content ... */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg"><Sparkles className="w-5 h-5 text-purple-400" /></div>
                  <div><h2 className="text-lg font-bold text-white leading-none">Gemini Intelligence</h2><p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Market Analysis Module</p></div>
                </div>
                <button onClick={() => setShowAIModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex border-b border-white/5 bg-black/20">
                <button onClick={() => setAiMode('report')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all relative ${aiMode === 'report' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>Market Pulse {aiMode === 'report' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />}</button>
                <button onClick={() => { setAiMode('chat'); setAiOutput(''); }} className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all relative ${aiMode === 'chat' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>Smart Recommender {aiMode === 'chat' && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />}</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-[#08080C] min-h-[400px]">
                {aiMode === 'report' ? (
                  <div className="space-y-6">
                    {!aiOutput && !aiLoading && (<div className="flex flex-col items-center justify-center h-full text-gray-600 mt-12 space-y-4"><div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"><BarChart3 className="w-8 h-8 opacity-50" /></div><p>Analyze current market trends.</p><button onClick={handleGenerateReport} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all border border-white/5">Initiate Scan</button></div>)}
                    {aiLoading && (<div className="flex flex-col items-center justify-center py-20 space-y-4"><div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /><p className="text-purple-400/80 text-xs tracking-widest animate-pulse uppercase">Processing Data...</p></div>)}
                    {aiOutput && !aiLoading && (<div className="prose prose-invert prose-sm max-w-none"><div className="whitespace-pre-wrap text-gray-300 font-light leading-7">{aiOutput}</div></div>)}
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-4 mb-4">
                       {!aiOutput && !aiLoading && (<div className="text-center text-gray-600 mt-12"><p className="mb-4">Describe your use case.</p><div className="flex flex-wrap justify-center gap-2">{["Cheapest coding model", "Best overall performance", "High reasoning tasks"].map(q => (<span key={q} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs hover:bg-white/10 cursor-pointer transition-colors" onClick={() => setChatInput(q)}>{q}</span>))}</div></div>)}
                       {aiOutput && <div className="bg-[#12121A] rounded-xl p-5 border border-white/5"><div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{aiOutput}</div></div>}
                       {aiLoading && <div className="flex gap-1 justify-center py-4"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"/><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"/><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"/></div>}
                       <div ref={messagesEndRef} />
                    </div>
                  </div>
                )}
              </div>
              {aiMode === 'chat' && (<div className="p-4 border-t border-white/5 bg-[#0F0F16]"><div className="relative"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRecommend()} placeholder="Ask Gemini..." className="w-full bg-[#05050A] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:border-cyan-500/50 focus:ring-0 transition-all placeholder-gray-700" /><button onClick={handleRecommend} disabled={!chatInput.trim() || aiLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-colors disabled:opacity-30"><Send className="w-4 h-4" /></button></div></div>)}
            </div>
          </div>
        )}

        {/* --- MAIN GRID CONTAINER (Horizontal Scroll for Small Screens) --- */}
        <div className="overflow-x-auto pb-8 custom-scrollbar">
          {/* Minimum width ensures no cramping on smaller screens */}
          <div className="min-w-[1400px] space-y-4">
            
            {/* Table Header */}
            <div 
              className="grid gap-6 px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] bg-[#050508]/80 backdrop-blur-xl border border-white/5 rounded-2xl sticky top-0 z-20 shadow-lg"
              style={{ gridTemplateColumns: '3.5fr 2.5fr 2fr 2fr 2fr' }}
            >
              <div className="pl-4 text-center cursor-pointer hover:text-white transition-colors" onClick={() => setActiveMenu(activeMenu === 'rank' ? null : 'rank')}>
                MODEL IDENTITY {activeMenu === 'rank' && <div className="absolute top-full left-0 mt-2 w-32 bg-[#15151E] border border-white/10 rounded-xl p-1 z-50 shadow-xl"><SortOption label="Min → Max" active={sortConfig.key === 'rank' && sortConfig.direction === 'asc'} onClick={() => handleSort('rank', 'asc', 'Rank (Min-Max)')} /><SortOption label="Max → Min" active={sortConfig.key === 'rank' && sortConfig.direction === 'desc'} onClick={() => handleSort('rank', 'desc', 'Rank (Max-Min)')} /></div>}
              </div>
              
              <div className="pl-2 relative flex items-center gap-2 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => setActiveMenu(activeMenu === 'swe' ? null : 'swe')}>
                SWE-bench Verified 
                {sortConfig.key === 'score' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />}
                {activeMenu === 'swe' && <div className="absolute top-full left-0 mt-2 w-48 bg-[#15151E] border border-white/10 rounded-xl p-1 z-50 shadow-xl"><SortOption label="Score (High → Low)" active={sortConfig.key === 'score' && sortConfig.direction === 'desc'} onClick={() => handleSort('score', 'desc', 'Score (High-Low)')} /><SortOption label="Score (Low → High)" active={sortConfig.key === 'score' && sortConfig.direction === 'asc'} onClick={() => handleSort('score', 'asc', 'Score (Low-High)')} /></div>}
              </div>

              <div className="pl-2 relative flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors" onClick={() => setActiveMenu(activeMenu === 'live' ? null : 'live')}>
                LiveBench GSO
                {sortConfig.key === 'liveBench' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />}
                {activeMenu === 'live' && <div className="absolute top-full left-0 mt-2 w-48 bg-[#15151E] border border-white/10 rounded-xl p-1 z-50 shadow-xl"><SortOption label="Score (High → Low)" active={sortConfig.key === 'liveBench' && sortConfig.direction === 'desc'} onClick={() => handleSort('liveBench', 'desc', 'Score (High-Low)')} /><SortOption label="Score (Low → High)" active={sortConfig.key === 'liveBench' && sortConfig.direction === 'asc'} onClick={() => handleSort('liveBench', 'asc', 'Score (Low-High)')} /></div>}
              </div>

              <div className="pl-2 relative flex items-center gap-2 cursor-pointer hover:text-orange-400 transition-colors" onClick={() => setActiveMenu(activeMenu === 'arena' ? null : 'arena')}>
                LLM Arena WebDev
                {sortConfig.key === 'llmArena' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />}
                {activeMenu === 'arena' && <div className="absolute top-full left-0 mt-2 w-48 bg-[#15151E] border border-white/10 rounded-xl p-1 z-50 shadow-xl"><SortOption label="Score (High → Low)" active={sortConfig.key === 'llmArena' && sortConfig.direction === 'desc'} onClick={() => handleSort('llmArena', 'desc', 'Score (High-Low)')} /><SortOption label="Score (Low → High)" active={sortConfig.key === 'llmArena' && sortConfig.direction === 'asc'} onClick={() => handleSort('llmArena', 'asc', 'Score (Low-High)')} /></div>}
              </div>

              <div className="pl-2 relative flex items-center gap-2 cursor-pointer hover:text-pink-400 transition-colors" onClick={() => setActiveMenu(activeMenu === 'design' ? null : 'design')}>
                DesignArena Elo
                {sortConfig.key === 'designArena' && <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />}
                {activeMenu === 'design' && <div className="absolute top-full right-0 md:left-0 mt-2 w-48 bg-[#15151E] border border-white/10 rounded-xl p-1 z-50 shadow-xl"><SortOption label="Rating (High → Low)" active={sortConfig.key === 'designArena' && sortConfig.direction === 'desc'} onClick={() => handleSort('designArena', 'desc', 'Rating (High-Low)')} /><SortOption label="Rating (Low → High)" active={sortConfig.key === 'designArena' && sortConfig.direction === 'asc'} onClick={() => handleSort('designArena', 'asc', 'Rating (Low-High)')} /></div>}
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-3">
              {sortedData.map((model, idx) => {
                const tier = getTierStyle(idx);
                const textColor = tier.text;
                const barColor = tier.bar;
                const barShadow = tier.barShadow;
                const borderStyle = tier.border;
                const glowStyle = tier.glow;

                return (
                  <div 
                    key={idx} 
                    className={`relative group grid gap-6 p-5 items-stretch bg-[#08080C]/40 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-300 hover:bg-[#0A0A12] ${borderStyle} ${glowStyle} hover:scale-[1.005] hover:z-10`}
                    style={{ gridTemplateColumns: '3.5fr 2.5fr 2fr 2fr 2fr' }}
                  >
                    {/* Identity */}
                    <div className="pl-4 border-r border-white/5 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        {idx < 3 && (
                          <span className="text-2xl filter drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] mr-1">
                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                          </span>
                        )}
                        <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors tracking-wide">{model.commonName}</span>
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1.5 font-mono uppercase tracking-widest pl-1">{model.provider}</div>
                    </div>

                    {/* SWE-bench */}
                    <div className="pl-2 pr-4 border-r border-white/5 h-full flex flex-col justify-center">
                      {model.swe ? (
                        <div className="w-full">
                          <div className="flex items-end justify-between mb-2">
                            <span className="text-[10px] text-gray-500 font-mono leading-tight whitespace-normal break-words flex-1 pr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                              {model.swe.name}
                            </span>
                            <span className={`text-xl font-bold font-mono tracking-tighter ${textColor} shrink-0`}>{model.swe.score.toFixed(2)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-800/40 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColor} ${barShadow} transition-all duration-1000`} style={{ width: isLoaded ? `${model.swe.score}%` : '0%' }} />
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center opacity-10">
                          <div className="w-full h-px bg-white/20"></div>
                        </div>
                      )}
                    </div>

                    {/* LiveBench */}
                    <div className="pl-2 pr-4 border-r border-white/5 h-full flex flex-col justify-center">
                      {model.live ? (
                        <div className="w-full">
                          <div className="flex items-end justify-between mb-2">
                            <span className="text-[10px] text-gray-500 font-mono leading-tight whitespace-normal break-words flex-1 pr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                              {model.live.name}
                            </span>
                            <span className={`text-xl font-bold font-mono tracking-tighter ${textColor} shrink-0`}>{model.live.score.toFixed(2)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-800/40 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColor} ${barShadow} transition-all duration-1000`} style={{ width: isLoaded ? `${(model.live.score / 80) * 100}%` : '0%' }} />
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center opacity-10">
                          <div className="w-full h-px bg-white/20"></div>
                        </div>
                      )}
                    </div>

                    {/* LLM Arena WebDev */}
                    <div className="pl-2 pr-4 border-r border-white/5 h-full flex flex-col justify-center">
                      {model.arena ? (
                        <div className="w-full">
                          <div className="flex items-end justify-between mb-2">
                            <span className="text-[10px] text-gray-500 font-mono leading-tight whitespace-normal break-words flex-1 pr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                              {model.arena.name}
                            </span>
                            <span className={`text-xl font-bold font-mono tracking-tighter ${textColor} shrink-0`}>{model.arena.score}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-800/40 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColor} ${barShadow} transition-all duration-1000`} style={{ width: isLoaded ? `${(model.arena.score / 1600) * 100}%` : '0%' }} />
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center opacity-10">
                          <div className="w-full h-px bg-white/20"></div>
                        </div>
                      )}
                    </div>

                    {/* DesignArena */}
                    <div className="pl-2 pr-4 h-full flex flex-col justify-center">
                      {model.design ? (
                        <div className="w-full">
                          <div className="flex items-end justify-between mb-2">
                            <span className="text-[10px] text-gray-500 font-mono leading-tight whitespace-normal break-words flex-1 pr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                              {model.design.name}
                            </span>
                            <span className={`text-xl font-bold font-mono tracking-tighter ${textColor} shrink-0`}>{model.design.score}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-800/40 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barColor} ${barShadow} transition-all duration-1000`} style={{ width: isLoaded ? `${(model.design.score / 1450) * 100}%` : '0%' }} />
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center opacity-10">
                          <div className="w-full h-px bg-white/20"></div>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
            
          </div>
          <TopModelsChart data={leaderboardData} />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

