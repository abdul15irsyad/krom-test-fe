# Krom Test Frontend

Irsyad Abdul Hamid Darussalam

## Tech Stack

- React Typescript

## Installation

1. install dependencies

   ```bash
   npm install
   ```

2. copy `.env.example` to `.env`
3. set configuration (set `VITE_API_URL`)
4. run the application

   ```bash
   npm run build && npm run preview
   ```

5. open app in the <http://localhost:4173>

## Installation with Docker

1. build image

   ```bash
   docker build -t krom-test-fe .
   ```

2. run container (change VITE_API_URL if the backend port not the default 6001)

   ```bash
   docker run -p 6002:80 --name krom-test-fe -e VITE_API_URL=http://localhost:6001 -d krom-test-fe
   ```
