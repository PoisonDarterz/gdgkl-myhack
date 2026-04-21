import os
from google import genai
from google.genai import types
from BA_prompt import ba_system_instruction_1_2, ba_system_instruction_3

def run_BAModel1_evaluator(submission_text):
    """Initializes Gemini 2.0 Pro and evaluates the submission."""
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Error: Environment variable 'GEMINI_API_KEY' not found."

    client = genai.Client(api_key=api_key)
    MODEL_ID = "gemini-3-pro-preview"

    try:
        response = client.models.generate_content(
            model=MODEL_ID,
            config=types.GenerateContentConfig(
                system_instruction=ba_system_instruction_1_2,
                temperature=0.1
            ),
            contents=f"Evaluate this project submission:\n\n{submission_text}"
        )
        return response.text
    except Exception as e:
        return f"Gemini API Error: {str(e)}"

def run_BAModel2_evaluator(submission_text):
    """Initializes Gemini 2.0 Pro and evaluates the submission."""
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Error: Environment variable 'GEMINI_API_KEY' not found."

    client = genai.Client(api_key=api_key)
    MODEL_ID = "gemini-3-pro-preview"

    try:
        response = client.models.generate_content(
            model=MODEL_ID,
            config=types.GenerateContentConfig(
                system_instruction=ba_system_instruction_1_2,
                temperature=0.1
            ),
            contents=f"Evaluate this project submission:\n\n{submission_text}"
        )
        return response.text
    except Exception as e:
        return f"Gemini API Error: {str(e)}"

def run_BAResonator_Model3(submission_text, report_1, report_2):
    """
    Acts as the Arbiter (Model 3).
    Synthesizes two reports into one final, authoritative Business Analysis evaluation.
    """
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return "Error: Environment variable 'GEMINI_API_KEY' not found."

    client = genai.Client(api_key=api_key)
    MODEL_ID = "gemini-2.5-pro"

    # Prepare the specialized prompt for Model 3
    prompt = f"""
ORIGINAL PROJECT SUBMISSION:
{submission_text}

---
REPORT 1 (FROM AGENT A):
{report_1}

---
REPORT 2 (FROM AGENT B):
{report_2}

---
Based on the two reports above and the original submission, provide the Final Resonated Business Analysis Evaluation in the requested JSON format.
"""

    try:
        response = client.models.generate_content(
            model=MODEL_ID,
            config=types.GenerateContentConfig(
                system_instruction=ba_system_instruction_3,
                temperature=0.1, 
                response_mime_type="application/json" 
            ),
            contents=prompt
        )
        return response.text
    except Exception as e:
        return f"Resonator Error: {str(e)}"
