import os
import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration - Allows your React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace "*" with your Vercel URL
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/")
def read_root():
    return {"status": "API is running"}

@app.post("/send-email")
async def send_email(form: ContactForm):
    api_key = os.getenv("RESEND_API_KEY")
    
    # 1. Check if API Key exists in Render Environment Variables
    if not api_key:
        print("CRITICAL ERROR: RESEND_API_KEY is not set in Render Environment Variables.")
        raise HTTPException(status_code=500, detail="Server configuration error.")

    # 2. Prepare the request to Resend
    async with httpx.AsyncClient() as client:
        try:
            print(f"Attempting to send email from {form.email} via Resend...")
            
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": "onboarding@resend.dev", # Must stay this for free accounts
                    "to": "keynb1999@gmail.com",      # Your Resend-account email
                    "subject": f"Portfolio Lead: {form.name}",
                    "reply_to": form.email,          # So you can reply directly to the sender
                    "text": f"Name: {form.name}\nEmail: {form.email}\n\nMessage:\n{form.message}",
                },
                timeout=15.0
            )

            # 3. Handle Resend API responses
            if response.status_code == 200 or response.status_code == 201:
                print("SUCCESS: Email sent successfully!")
                return {"status": "success", "message": "Email sent"}
            else:
                # This will print the exact reason from Resend in your Render logs
                print(f"RESEND API ERROR: {response.status_code} - {response.text}")
                raise HTTPException(
                    status_code=response.status_code, 
                    detail=f"Resend error: {response.text}"
                )

        except httpx.RequestError as exc:
            print(f"NETWORK ERROR: Could not reach Resend servers. {exc}")
            raise HTTPException(status_code=503, detail="Email service unreachable.")
        except Exception as e:
            print(f"UNEXPECTED ERROR: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error.")