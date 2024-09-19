{ Social Media App }

This is a full-stack social media application built with Node.js, Express, MySQL, Zod, JWT, and TypeScript on the backend, and Next.js with Zod validation on the frontend. The app includes features such as user authentication, post creation, following users, and more.

Table of Contents
Technologies
Features
Project Structure
Prerequisites
Environment Variables
Backend Setup
Frontend Setup
Scripts
API Endpoints
Technologies


Backend -- 

Node.js: JavaScript runtime
Express.js: Fast, unopinionated web framework
MySQL: Relational database for storing user and post data
jsonwebtoken: Authentication with JWT tokens
bcrypt: For password hashing
Zod: Schema validation
TypeScript: Type safety and better code quality
dotenv: Manage environment variables


Frontend --- 
Next.js: React framework for server-side rendering and static site generation
Zod: Schema validation for form data
Tailwind CSS: Utility-first CSS framework for styling
TypeScript: Type safety for React components and state management
Features
User Authentication: Register and log in using secure JWT-based authentication.
Post Creation: Authenticated users can create and share posts.
Follow System: Users can follow 
Responsive Design: The frontend is built using Tailwind CSS, ensuring a responsive layout.
Project Structure
bash
Copy code
/backend
  ├── src/
      ├── controllers/
      ├── middlewares/  
      ├── models/
      ├── routes/
      ├── utils/
      ├── app.ts
      └── db/

/frontend
  ├── app/
  ├── components/
  ├── utils/

Prerequisites
Node.js (v14+)
MySQL database installed locally or hosted
npm or yarn
Environment Variables

Backend .env file:

DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret
PORT=5000


Frontend .env file:

NEXT_PUBLIC_API_URL=http://localhost:5000/api


Backend Setup
Clone the repository:

git clone https://github.com/yourusername/social-media-app.git
Navigate to the backend folder:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Setup environment variables:
Create a .env file in the /backend directory and add the environment variables listed above.

Build the backend:
 tsc -b

Start the backend:

npm run dev

The backend will start at http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

cd social-media

Install dependencies:
npm install

Setup environment variables:
Create a .env file in the /frontend directory and add the environment variables listed above.

Start the frontend:
npm run dev

The frontend will start at http://localhost:3000.

Scripts
Backend Scripts
 tsc -b: Build the backend TypeScript code
npm run dev: Run the backend server in development mode
npm run start: Start the production build of the backend


Frontend Scripts
npm run dev: Start the Next.js frontend in development mode
npm run build: Build the frontend for production

API Endpoints
User Authentication
POST /api/user/register: Register a new user
POST /api//userlogin: Login and receive a JWT token

Post Management
GET api/post/all: Get all posts
POST api/post/create: Create a new post (Requires JWT)
Follow Users
POST api/post/follow/:userId: Follow a user (Requires JWT)
POST api/post/like/:userId: Follow a user (Requires JWT)

Sample .env for Backend:

DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret
PORT=5000

Sample .env for Frontend:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Running the Project Locally
Start Backend: Navigate to the /backend folder and run npm run dev.
Start Frontend: Navigate to the /frontend folder and run npm run dev.
Now, the backend will run on http://localhost:5000 and the frontend on http://localhost:3000.