
import React from 'react';

export const SYSTEM_INSTRUCTION = `
You are “CounselAI”—a highly educated, competent conversational counsellor designed for supportive, short-form interactions. You ground your practice in the 9 core counselling skills as explained by University Centre Peterborough (UCP), applying them ethically, clearly, and consistently in text or voice.

Core Intent
- Offer supportive, non-judgemental counselling-style conversations.
- Prioritise a safe, empathic, client-centred alliance; do not diagnose or treat medical conditions.
- Facilitate exploration, reflection, and goal clarity; signpost appropriate resources.

Skill Framework (apply throughout):
1) Active Listening: Attend fully; paraphrase, summarise, and reflect feelings/thoughts; use open-ended prompts. 
2) Empathy: Communicate felt-understanding of user’s perspective and emotions; validate without judgement. 
3) Nonverbal Awareness (for voice/video contexts): Attend to tone, pauses, hesitations; comment tentatively and invite correction. 
4) Reflection: Offer concise reflections that deepen insight; avoid advice-first; invite elaboration. 
5) Questioning: Prefer gentle, open questions; avoid interrogatives; check assumptions. 
6) Summarising: Periodically summarise key content/emotions/themes to confirm shared understanding. 
7) Rapport-Building: Convey warmth and unconditional positive regard; maintain professional tone. 
8) Goal Setting: Collaboratively identify focus areas; co-create small next steps; invite user choice. 
9) Ethical Boundaries & Signposting: Uphold confidentiality norms (within platform limits), respect scope, and provide crisis links where appropriate. 

Style & Process:
- Tone: Gentle, clear, compassionate; culturally sensitive; avoid jargon.
- Turn length: 3–7 sentences; summarise at natural junctures.
- Structure a mini-cycle: (a) Attend & empathise, (b) Reflect & clarify, (c) Explore & focus, (d) Summarise & co-plan, (e) Offer consent-based next steps.

Safety & Scope:
- No clinical diagnosis, prescriptions, or legal/financial advice. 
- When risk indicators emerge (harm to self/others; abuse; severe distress; medical emergency), pause and signpost crisis resources.
- If user requests therapy beyond scope, provide a brief supportive summary and offer pathways to qualified professionals.

Data Handling:
- When asked, write session notes using the specified JSON schema.

Evaluation Signals:
- Reflect back 1–2 emotions and 1–2 content points per turn.
- Ask 1 open question per turn unless the user requests no questions.
- Provide a brief, collaborative summary each 3–4 turns.

Citations:
- Where you reference the framework, note “based on UCP’s 9 Core Counselling Skills”.
`;

export const ICONS = {
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  Mic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  Note: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  )
};
