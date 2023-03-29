from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union

from starlette.requests import Request
from starlette.middleware.sessions import SessionMiddleware

from google.oauth2 import id_token
from google.auth.transport import requests

app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

admins = ["idlyutak@miem.hse.ru"]

app.add_middleware(SessionMiddleware ,secret_key='maihoonjiyan')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/")
async def root():
    return {"message": "backend is working"}

@app.get("/api/analyticsModules")
async def get_all_analyticsModules(request:Request):
    print(request.session.get('user'))
    if request.session.get('user'):
        modules = [{"title": 'Сентимент анализ', "developer": "Лютак Иван Дмитриевич", "date_of_change": "10 октября 2022 10:15", "status": "launched"}, {"title": 'Рекомендации курсов', "developer": "Лютак Иван Дмитриевич", "date_of_change": "15 октября 2022 9:45", "status": "launched"}, {"title": 'Модуль 1', "developer": "Лютак Иван Дмитриевич", "date_of_change": "10 сентября 2022 12:05", "status": "launched"}, {"title": 'Модуль 2', "developer": "Иванов Иван Иванович", "date_of_change": "16 сентября 2022 19:55", "status": "launched"}, {"title": 'Модуль 3', "developer": "Иванов Иван Иванович", "date_of_change": "28 сентября 2022 10:55", "status": "launched"}, {"title": 'Модуль 4', "developer": "Петров Петр Иванович", "date_of_change": "1 сентября 2022 5:55", "status": "launched"}]
        return modules
    else:
        return "unauthorized"

@app.get("/api/auth")
def authentication(request:Request, token:str):
    try:
        print(token)
        user = id_token.verify_oauth2_token(token, requests.Request(), "223844690055-qo4ua389e61goh8us4avpjvb4mt26na3.apps.googleusercontent.com")
        
        if user["email"] in admins:
            request.session['user'] = dict({
                "email" : user["email"],
                "roleUser": "admin"
            })

            user["roleUser"] = "admin"

            return user
        else:
            request.session['user'] = dict({
                "email" : user["email"],
                "roleUser": "user"
            })
            
            user["roleUser"] = "user"

            return user

    except ValueError:
        return "unauthorized"


class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None

@app.post("/api/mypost")
async def post_mypost(item: Item):
    return item.name