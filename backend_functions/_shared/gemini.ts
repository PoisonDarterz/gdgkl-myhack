import { BA_SYSTEM_1_2, BA_SYSTEM_3, AI_SE_SYSTEM_1_2, AI_SE_SYSTEM_3 } from './prompts.ts'

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'

async function callGemini(
  model: string,
  systemInstruction: string,
  prompt: string,
  temperature: number,
  jsonMode = false
): Promise<string> {
  const apiKey = Deno.env.get('GEMINI_API_KEY')
  if (!apiKey) throw new Error("GEMINI_API_KEY not set")

  const url = `${BASE_URL}/${model}:generateContent?key=${apiKey}`
  const body: Record<string, unknown> = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
    },
  }

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`Gemini API error ${resp.status}: ${err}`)
  }

  const data = await resp.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}

export async function runBAModel1(submissionText: string): Promise<string> {
  return callGemini(
    'gemini-3-pro-preview',
    BA_SYSTEM_1_2,
    `Evaluate this project submission:\n\n${submissionText}`,
    0.1
  )
}

export async function runBAModel2(submissionText: string): Promise<string> {
  return callGemini(
    'gemini-3-pro-preview',
    BA_SYSTEM_1_2,
    `Evaluate this project submission:\n\n${submissionText}`,
    0.1
  )
}

export async function runBAResonator(
  submissionText: string,
  report1: string,
  report2: string
): Promise<string> {
  const prompt = `ORIGINAL PROJECT SUBMISSION:\n${submissionText}\n\n---\nREPORT 1 (FROM AGENT A):\n${report1}\n\n---\nREPORT 2 (FROM AGENT B):\n${report2}\n\n---\nBased on the two reports above and the original submission, provide the Final Resonated Business Analysis Evaluation in the requested JSON format.`
  return callGemini('gemini-2.5-pro', BA_SYSTEM_3, prompt, 0.1, true)
}

export async function runAISEModel1(submissionText: string): Promise<string> {
  return callGemini(
    'gemini-3-pro-preview',
    AI_SE_SYSTEM_1_2,
    `Evaluate this project submission:\n\n${submissionText}`,
    0.2
  )
}

export async function runAISEModel2(submissionText: string): Promise<string> {
  return callGemini(
    'gemini-3-pro-preview',
    AI_SE_SYSTEM_1_2,
    `Evaluate this project submission:\n\n${submissionText}`,
    0.2
  )
}

export async function runAISEResonator(
  submissionText: string,
  report1: string,
  report2: string
): Promise<string> {
  const prompt = `ORIGINAL PROJECT SUBMISSION:\n${submissionText}\n\n---\nREPORT 1 (FROM AGENT A):\n${report1}\n\n---\nREPORT 2 (FROM AGENT B):\n${report2}\n\n---\nBased on the two reports above and the original submission, provide the Final Resonated AI Software Engineer Evaluation in the requested JSON format.`
  return callGemini('gemini-2.5-pro', AI_SE_SYSTEM_3, prompt, 0.1, true)
}

// Run BA dual-agent evaluation (Model1 + Model2 in parallel → Resonator)
export async function runBAEvaluation(
  submissionText: string
): Promise<string> {
  const DISCREPANCY_THRESHOLD = 15
  const MAX_RETRIES = 3

  let report1 = ''
  let report2 = ''

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    ;[report1, report2] = await Promise.all([
      runBAModel1(submissionText),
      runBAModel2(submissionText),
    ])

    const score1 = extractWeightedFinal(report1)
    const score2 = extractWeightedFinal(report2)

    if (score1 !== null && score2 !== null) {
      if (Math.abs(score1 - score2) <= DISCREPANCY_THRESHOLD) break
      if (attempt === MAX_RETRIES) break
    } else {
      break
    }
  }

  return runBAResonator(submissionText, report1, report2)
}

// Run AI SE dual-agent evaluation (Model1 + Model2 in parallel → Resonator)
export async function runAISEEvaluation(
  submissionText: string
): Promise<string> {
  const DISCREPANCY_THRESHOLD = 15
  const MAX_RETRIES = 3

  let report1 = ''
  let report2 = ''

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    ;[report1, report2] = await Promise.all([
      runAISEModel1(submissionText),
      runAISEModel2(submissionText),
    ])

    const score1 = extractWeightedFinal(report1)
    const score2 = extractWeightedFinal(report2)

    if (score1 !== null && score2 !== null) {
      if (Math.abs(score1 - score2) <= DISCREPANCY_THRESHOLD) break
      if (attempt === MAX_RETRIES) break
    } else {
      break
    }
  }

  return runAISEResonator(submissionText, report1, report2)
}

function extractWeightedFinal(reportText: string): number | null {
  const patterns = [
    /WEIGHTED\s*FINAL[*\s|:]*(\d+(?:\.\d+)?)\s*\/?\s*100/i,
    /WEIGHTED\s*FINAL[*\s|:]*(\d+(?:\.\d+)?)/i,
    /\*\*WEIGHTED\s*FINAL\*\*\s*\|\s*(\d+(?:\.\d+)?)/i,
  ]
  for (const pattern of patterns) {
    const match = reportText.match(pattern)
    if (match) return parseFloat(match[1])
  }
  return null
}
