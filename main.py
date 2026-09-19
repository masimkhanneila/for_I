from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()


@app.get("/")
def home():
    return FileResponse("index.html")


@app.get("/style.css")
def css():
    return FileResponse("style.css")


@app.get("/script.js")
def javascript():
    return FileResponse("script.js")


@app.get("/heart.svg")
def heart():
    return FileResponse("heart.svg")


@app.get("/friend.jpg")
def friend():
    return FileResponse("friend.jpg")


@app.get("/me.jpg")
def me():
    return FileResponse("me.jpg")


@app.get("/check")
def check():
    return {
        "friend_exists": os.path.exists("friend.jpg"),
        "me_exists": os.path.exists("me.jpg"),
        "heart_exists": os.path.exists("heart.svg"),
        "files": os.listdir(".")
    }