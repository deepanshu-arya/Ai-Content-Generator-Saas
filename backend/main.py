from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class ContentRequest(BaseModel):
    prompt: str
    tone: str
    type: str

# Response Model
class ContentResponse(BaseModel):
    content: str

# SIMPLE LOGIC (NO AI API)
def generate_content_logic(prompt, tone, type_):
    if type_ == "blog":
        return f"""
Title: {prompt}

Introduction:
{prompt} is an important topic in today's world.

Main Content:
- Point 1: Explanation about {prompt}
- Point 2: Benefits and use cases
- Point 3: Real-world examples

Conclusion:
{prompt} is highly valuable and useful.
"""

    elif type_ == "linkedin post":
        return f"""
🚀 {prompt}

Sharing some thoughts on {prompt}.

✔ Key insights
✔ Practical use
✔ Growth opportunities

#AI #Business #Growth
"""

    elif type_ == "ad copy":
        return f"""
🔥 {prompt} 🔥

Don't miss out on this opportunity!

✔ High quality
✔ Affordable
✔ Trusted by many

👉 Try now!
"""

    return "Invalid type"

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.post("/generate", response_model=ContentResponse)
def generate(req: ContentRequest):
    content = generate_content_logic(req.prompt, req.tone, req.type)
    return {"content": content}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)