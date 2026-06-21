/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the backend API, e.g. https://your-backend.hf.space */
  readonly VITE_API_URL?: string;
  /** Groq API key for the chatbot (bundled into the build — not truly secret). */
  readonly VITE_GROQ_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
