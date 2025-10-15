Automated Job Portal Application

Tech Stack: MERN Stack (MongoDB, Express.js, React.js, Node.js, Tailwind CSS, REST API, JWT, Multer, Cloudinary)

Project Overview

A full-stack job portal allowing users to browse and apply for jobs and recruiters to post job listings. Integrates real-time job data using Jooble and Adzuna APIs, with secure authentication, responsive UI, file uploads, and smooth user experience.

Key Features

Secure Authentication: Login/signup with JWT and cookie sessions.

Real-Time Job Listings: Integrated Jooble and Adzuna APIs for automated updates.

Resume Upload: Users can upload resumes securely; handled with Multer and stored on Cloudinary.

Responsive Design: Built with React.js and Tailwind CSS for mobile and desktop.

Robust Error Handling: Validations and error management for smooth workflow.

Installation
Backend
cd backend
npm install


Create a .env file (add to .gitignore to keep keys private):

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
ADZUNA_API_KEY=<your-adzuna-api-key>
ADZUNA_APP_ID=<your-adzuna-app-id>
JOOBLE_API_KEY=<your-jooble-api-key>
PORT=5000

npm start

Frontend
cd frontend
npm install
npm start


Open http://localhost:3000

Future Enhancements

Role-based dashboards for recruiters and job seekers.

Notifications/email alerts for new job postings.

Advanced search filters and saved job lists.

Skills & Learning Outcomes

Full-stack MERN development

JWT authentication & secure session management

REST API integration with Jooble and Adzuna

File upload & cloud storage with Multer and Cloudinary

Responsive UI design using Tailwind CSS
