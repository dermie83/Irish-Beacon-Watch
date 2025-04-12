# 🚀 Next.js App with PostgreSQL on Neon & Deployed via Vercel

This project is built with **Next.js**, deployed on **Vercel**, and uses **PostgreSQL** as the database hosted on **Neon**. The stack supports a robust, scalable, and production-ready full-stack application.

---

## 📦 Tech Stack

- **Frontend/Backend:** [Next.js](https://nextjs.org/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/)
- **Deployment & Hosting:** [Vercel](https://vercel.com/)
- **Monitoring & Security:** Provided by Vercel's built-in analytics and features

---

## 🌐 API Connectivity

This application integrates with external APIs to enhance functionality and provide real-time data. It uses the [Open-Meteo](https://open-meteo.com/) API to fetch weather information based on location data. For mapping and geolocation, the app leverages [OpenStreetMap](https://www.openstreetmap.org/), an open-source and community-driven mapping service. These APIs enable dynamic user experiences such as location-based weather forecasts and interactive maps.

--- 

=======
## 🛠️ Getting Started

### 1. Clone the Repository


git clone https://github.com/dermie83/Irish-Beacon-Watch.git
cd Irish-Beacon-Watch


You can view the official Webpage here: https://irish-beacon-watch.vercel.app/


### 2. Install Dependencies
Make sure you have pnpm installed:

pnpm install

### 3. Setup Environment Variables
Create a .env file in the root of your project:

Add your PostgreSQL database credentials: 
You will be required to set up a Vercel account and create a new database connection for the project. Visit [Vercel](https://vercel.com/)

This project used the following API connection type

### Parameters for Vercel Postgres Templates
POSTGRES_URL=************  
POSTGRES_URL_NON_POOLING=************************  
POSTGRES_USER=*************  
POSTGRES_HOST=*************  
POSTGRES_PASSWORD=*****************  
POSTGRES_DATABASE=*****************  
POSTGRES_URL_NO_SSL=*******************  
POSTGRES_PRISMA_URL=*******************  


### 🧪 Development
Start the development server:

pnpm dev

The app will be available at http://localhost:3000

---

=======

## 🧰 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Neon Dashboard](https://neon.tech/dashboard)
- [pnpm Docs](https://pnpm.io/)


---

=======

## Learning and Development
### More useful links 
This project was develpoed from the following boilerplate from Next.js:  

https://nextjs.org/learn/dashboard-app


```bash
