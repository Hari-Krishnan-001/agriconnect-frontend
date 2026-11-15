# AgriConnect Frontend

The React frontend for **AgriConnect**, an agriculture-focused platform bringing farmers, students, and business users together. It provides role-oriented dashboards and workflows for crop discovery, orders, projects, communication, and agricultural knowledge.

## Features
- Public landing page and application navigation
- User registration and login screens
- Farmer, student, and business dashboards
- Crop marketplace, crop details, and crop-management pages
- Order and farmer order-management screens
- Project creation, exploration, details, and editing
- Messaging, order chat, and project chat
- Knowledge base and pesticide-related screens, including a scanner interface
- Role-specific profiles and settings
- Dark-mode preference stored in browser local storage

## Tech Stack
- React 19
- JavaScript (ES modules)
- Vite 8
- React Router 7
- Axios
- React Icons
- Oxlint

## Project Structure
~~~text
src/
├── components/
│   ├── cards/
│   ├── dashboard/
│   ├── navbar/
│   └── sidebar/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── App.jsx
└── main.jsx
~~~

## Prerequisites
- Node.js compatible with the installed Vite version
- npm
- AgriConnect backend running locally or deployed

## Configuration
Create a .env file in the project root:

~~~env
VITE_API_BASE_URL=http://localhost:8080
~~~

Set this to the deployed backend URL when needed. The same variable is documented in .env.example.

**Security:** Vite variables prefixed with VITE_ are included in the client-side bundle. Never put private server credentials in them.

## Getting Started
~~~bash
git clone https://github.com/Hari-Krishnan-001/agriconnect-frontend.git
cd agriconnect-frontend
npm install
npm run dev
~~~

Open the local URL printed by Vite.

## Available Scripts
| Command | Description |
|---|---|
| npm run dev | Start the Vite development server |
| npm run build | Build the production frontend |
| npm run preview | Preview the production build |
| npm run lint | Run Oxlint |

## Backend Integration
The Axios client is configured in src/services/api.js. It uses VITE_API_BASE_URL (falling back to http://localhost:8080) and attaches a stored JWT as a Bearer token when present.

Companion backend: [agriLink-backend](https://github.com/Hari-Krishnan-001/agriLink-backend).

## Notes
- Data-driven features expect the backend API to be available.
- The API client reads the authentication token from browser local storage.
- This README describes the current source tree; it does not claim deployment or end-to-end test completion.

## License
No license file is currently included. All rights remain with the repository owner unless a license is added.
