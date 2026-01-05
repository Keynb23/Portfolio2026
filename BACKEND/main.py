import os
import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str


@app.post("/send-email")
async def send_email(form: ContactForm):
    api_key = os.getenv("RESEND_API_KEY")

    if not api_key:
        raise HTTPException(status_code=500, detail="Missing API Key")

    # This sends the email via a standard web request (Port 443), which is never blocked
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "from": "onboarding@resend.dev",
                "to": "keynb1999@gmail.com",  # Your GitHub/Resend account email
                "subject": f"Portfolio Lead: {form.name}",
                "reply_to": form.email,  # This allows you to hit 'Reply' in Gmail
                "text": f"From: {form.name} ({form.email})\n\nMessage: {form.message}",
            },
        )

    if response.status_code != 200:
        print(f"Resend Error: {response.text}")
        raise HTTPException(status_code=500, detail="Failed to send email")

    return {"status": "success"}
