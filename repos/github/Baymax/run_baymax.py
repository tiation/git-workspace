from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

MODEL_ID = "mistralai/Mixtral-8x7B-Instruct-v0.1"

USE_8BIT = True       # Change to False if you want FP16
USE_FP16 = not USE_8BIT

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)

print("Loading model...")
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    device_map="auto",
    load_in_8bit=USE_8BIT,
    torch_dtype=torch.float16 if USE_FP16 else None
)

with open("Baymax/system_prompt.txt", "r") as f:
    system_prompt = f.read()

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)

print("Baymax is ready. Type your message below.\n")

while True:
    user_input = input("You: ")
    if user_input.strip().lower() in ["exit", "quit"]:
        break

    prompt = f"{system_prompt}\n\nUser: {user_input}\nBaymax:"
    response = pipe(prompt, max_new_tokens=200, do_sample=True, temperature=0.7)[0]["generated_text"]
    print("\n" + response.split("Baymax:")[-1].strip() + "\n")
