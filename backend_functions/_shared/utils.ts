// Fetch plain text from a public Google Doc
export async function getPublicGdocText(url: string): Promise<string> {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
  if (!match) return 'Error: Invalid URL format.'

  const docId = match[1]
  const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`

  try {
    const resp = await fetch(exportUrl)
    if (resp.ok) return resp.text()
    return `Error: Status ${resp.status}. Verify the Doc is set to 'Anyone with the link can view'.`
  } catch (e) {
    return `Error: ${e instanceof Error ? e.message : String(e)}`
  }
}

// Fetch CSV data from a public Google Sheet
export async function getPublicGsheetCsv(url: string): Promise<string> {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
  if (!match) return 'Error: Invalid Google Sheet URL format.'

  const sheetId = match[1]
  const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`

  try {
    const resp = await fetch(exportUrl)
    if (resp.ok) return resp.text()
    return `Error: Status ${resp.status}. Verify the Sheet is set to 'Anyone with the link can view'.`
  } catch (e) {
    return `Error: ${e instanceof Error ? e.message : String(e)}`
  }
}

// Fetch README from a public GitHub repo
export async function getGithubReadme(url: string): Promise<string | null> {
  const match = url.match(/github\.com\/([^/]+)\/([^/?#\s]+)/)
  if (!match) return null

  const owner = match[1]
  const repo = match[2].replace(/\.git$/, '')
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`

  try {
    const resp = await fetch(apiUrl, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
    if (!resp.ok) return null
    const data = await resp.json()
    const content = data?.content ?? ''
    return atob(content.replace(/\n/g, ''))
  } catch {
    return null
  }
}

// Fetch plain text from a public Google Slides presentation
export async function getGoogleSlidesText(url: string): Promise<string | null> {
  const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/)
  if (!match) return null

  const presId = match[1]
  const exportUrl = `https://docs.google.com/presentation/d/${presId}/export/txt`

  try {
    const resp = await fetch(exportUrl)
    if (resp.ok) return resp.text()
  } catch {
    // fall through
  }
  return null
}

// Build structured project content string from a Google Sheet row
export async function buildProjectContent(
  row: string[],
  teamName: string
): Promise<string> {
  const githubLink = (row[6] ?? '').trim()
  const docsLink = (row[8] ?? '').trim()

  let content = `
### GENERAL INFORMATION
- TEAM NAME: ${teamName}
- GDGOC CHAPTERS: ${(row[9] ?? '').trim()}
- GDGOC MEMBER STATUS: ${(row[2] ?? '').trim()}
- GOOGLE TECH + AI REQUIREMENT MET: ${(row[3] ?? '').trim()}
- GOOGLE AI TECH REQUIREMENT MET: ${(row[4] ?? '').trim()}

### LINKS
- GITHUB/PROTOTYPE LINK: ${githubLink}
- VIDEO LINK: ${(row[7] ?? '').trim()}
- DOCUMENTATION LINK: ${docsLink}

### PRODUCT & IMPACT
- REAL-WORLD PROBLEM SOLVED: ${(row[31] ?? '').trim()}
- SUSTAINABLE DEVELOPMENT GOALS (SDGs): ${(row[5] ?? '').trim()}
- DETAILED SDG TARGETS: ${(row[32] ?? '').trim()}
- REASONING BEHIND SDG SELECTION: ${(row[33] ?? '').trim()}
- SUCCESS MEASUREMENT: ${(row[37] ?? '').trim()}
- UNIQUE APPROACH: ${(row[42] ?? '').trim()}
- GROWTH POTENTIAL: ${(row[43] ?? '').trim()}

### USER-CENTRIC DESIGN
- USER VALIDATION PROCESS: ${(row[34] ?? '').trim()}
- KEY INSIGHTS FROM USER FEEDBACK: ${(row[35] ?? '').trim()}
- CHANGES MADE BASED ON USER FEEDBACK: ${(row[36] ?? '').trim()}

### TECHNICAL IMPLEMENTATION
- GOOGLE AI TECHNOLOGY IMPLEMENTED: ${(row[39] ?? '').trim()}
- HOW AI MAKES THE SOLUTION SMARTER: ${(row[40] ?? '').trim()}
- WHAT IS LOST WITHOUT AI: ${(row[41] ?? '').trim()}
- ANALYTICS POWERED BY GOOGLE: ${(row[38] ?? '').trim()}
- FULL TECH STACK & REASONING: ${(row[44] ?? '').trim()}
- SOLUTION ARCHITECTURE: ${(row[45] ?? '').trim()}
- SIGNIFICANT TECHNICAL CHALLENGE: ${(row[46] ?? '').trim()}
- TECHNICAL TRADE-OFFS MADE: ${(row[47] ?? '').trim()}

### FUTURE & SCALABILITY
- FUTURE STEPS & EXPANSION PLAN: ${(row[48] ?? '').trim()}
- SCALABILITY & ARCHITECTURAL ADAPTATION: ${(row[49] ?? '').trim()}
`

  if (githubLink && githubLink.includes('github.com')) {
    const readme = await getGithubReadme(githubLink)
    if (readme) content += `\n\n### GITHUB README (fetched)\n${readme.slice(0, 3000)}`
  }

  if (docsLink) {
    if (docsLink.includes('presentation')) {
      const slides = await getGoogleSlidesText(docsLink)
      if (slides) content += `\n\n### SLIDE DECK CONTENT (fetched)\n${slides.slice(0, 3000)}`
    } else if (docsLink.includes('document')) {
      const doc = await getPublicGdocText(docsLink)
      if (doc && !doc.startsWith('Error')) {
        content += `\n\n### DOCUMENTATION CONTENT (fetched)\n${doc.slice(0, 3000)}`
      }
    }
  }

  return content
}

// Parse CSV string into array of rows (handles quoted fields)
export function parseCsv(csvText: string): string[][] {
  const rows: string[][] = []
  const lines = csvText.split('\n')
  for (const line of lines) {
    if (!line.trim()) continue
    const row: string[] = []
    let inQuotes = false
    let current = ''
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        inQuotes = !inQuotes
      } else if (ch === ',' && !inQuotes) {
        row.push(current)
        current = ''
      } else {
        current += ch
      }
    }
    row.push(current)
    rows.push(row)
  }
  return rows
}
