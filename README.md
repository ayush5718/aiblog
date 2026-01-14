# AI Blog Platform (MERN + PostgreSQL)

**client** → Frontend (React)
**server** → Backend (Node.js + Express)
**db** → Database (PostgreSQL)

## Features

Admin authentication (JWT)

Create, edit, delete blogs

Publish / unpublish blogs

AI generated blog titles, content, and images

Public blog listing and blog detail pages

Rate limiting for AI APIs


## Frontend

React (Vite)

Redux Toolkit

Axios

Tailwind CSS

## backend

Node.js + Express

PostgreSQL

JWT authentication

Rate limiter (using express-rate-limiter)

Gemini api

Imagekit


Clone this repo 
Git clone https://github.com/ayush5718/aiblog.git

## Backend Setup 
cd server

npm install

npm run dev

## Environment Variables

### create a .env inside the server directory

DATABASE_URL=your_postgresql_url 

PORT=port_number

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

## Frontend Setup 
cd client

npm install

npm run dev


## Imp notes 

Blogs are created in draft mode by default

Only published blogs are visible to real users 

Ai content is also editable before saving
