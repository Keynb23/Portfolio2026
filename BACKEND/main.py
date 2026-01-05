from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
import os

app = FastAPI()

# SECURITY: Replace "*" with your actual portfolio URL once live (e.g., https://yourname.com)
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


@app.get("/")
def read_root():
    return {"status": "Server is running"}


@app.post("/send-email")
async def send_email(form: ContactForm):
    # Your Gmail credentials
    my_email = "keynb50@gmail.com"
    # This must be the 16-character App Password from Google
    password = os.getenv("EMAIL_APP_PASSWORD")

    if not password:
        raise HTTPException(
            status_code=500, detail="Server configuration error: Missing credentials."
        )

    # Building the email content
    email_body = f"New message from: {form.name}\nEmail: {form.email}\n\nMessage:\n{form.message}"

    msg = MIMEText(email_body)
    msg["Subject"] = f"Portfolio Employment Offer: {form.name}"
    msg["From"] = my_email
    msg["To"] = my_email
    msg["Reply-To"] = form.email  # Crucial: Allows you to click 'Reply' in Gmail

    try:
            # 1. Standardize the connection
            server = smtplib.SMTP("smtp.gmail.com", 587, timeout=30)
            server.set_debuglevel(1) # This will print extra details to Render logs
            
            # 2. Identify ourselves to the server
            server.ehlo() 
            
            # 3. Secure the connection
            server.starttls()
            
            # 4. Identify again over the secure connection
            server.ehlo()
            
            # 5. Login and Send
            server.login(my_email, password)
            server.sendmail(my_email, my_email, msg.as_string())
            server.quit()
            
            return {"status": "success", "message": "Email sent successfully"}
    except Exception as e:
        print(f"SMTP Error: {e}")  # This will show up in Render logs
        raise HTTPException(status_code=500, detail=str(e))
        