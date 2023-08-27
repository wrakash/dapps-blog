# Nest.js and Next.js Blog Project

A robust blog project with role-based authentication, JWT authorization, CRUD operations, server-side rendering (SSR) for SEO, and AWS EC2 deployment.

# deployed url:

- frontend url : http://65.2.5.79:3000/
- backend url : http://65.2.5.79:3008/
- github url : https://github.com/wrakash/dapps-blog.git
- credentials for admin : {
  email:akash@gmail.com
  password:"Akash@1997 }

## Project Previews

![Preview 1](/previews/preview1.png)
_Preview 1: Blogs List page_

![Preview 2](/previews/preview2.png)
_Preview 2: Individual Blog Page_

![Preview 3](/previews/preview3.png)
_Preview 3: Admin Login Page for CRUD Operations_

![Preview 4](/previews/preview4.png)
_Preview 4: Admin List Page for all blog with delete option_

![Preview 5](/previews/preview5.png)
_Preview 5: Admin Create Page for a new blog_

![Preview 6](/previews/preview6.png)
_Preview 6: Admin Edit Page for a update existing blog_

![Preview 7](/previews/preview7.png)
_Preview 7: Admin logout Page_

![Preview 8](/previews/preview8.png)
_Preview 8: Admin Search Page for query_

## Table of Contents

- [Installation](#installation)
- [MongoDB Atlas Configuration](#mongodb-atlas-configuration)
- [Usage](#usage)
- [Authentication and Authorization](#authentication-and-authorization)
- [API Documentation](#api-documentation)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Notes](#notes)

## Installation

1. Navigate to the project directory:
   cd dapps-blog

2. Install backend dependencies:
   cd dapp-backend
   npm install

3. Install frontend dependencies:
   cd dapp-frontend
   npm install

4. Set up environment variables for frontend.
   NEXTAUTH_SECRET=################################
   NEXTAUTH_URL=################################
   NEXT_PUBLIC_API_ENDPOINT=################################

   Save the changes to the .env.local file.

5. Set up environment variables for backend.
   PORT=####
   MONGODB_URI=################################
   JWT_SECRET=################################
   JWT_EXPIRATION=################################
   AWS_S3_REGION=################################
   AWS_ACCESS_KEY_ID=################################
   AWS_ACCESS_KEY_SECRET=################################
   S3_BUCKET_NAME=################################

   Save the changes to the .env file.

## MongoDB Atlas Configuration

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Create a new project and cluster within your MongoDB Atlas account.

3. Configure network access settings to allow your application to connect to the cluster.

4. Obtain the connection string for your cluster:

- Click on "Clusters" in the MongoDB Atlas dashboard.
- Click on "Connect" for your desired cluster.
- Select "Connect your application" and copy the connection string.

5. Update MONGODB_URI=################################ in the `.env` file in the backend.

## Usage

1. Run the backend server:
   cd dapp-backend
   npm run start:dev

2. Run the frontend development server:
   cd dapp-frontend
   npm run dev

3. Open your browser and access the project at http://localhost:####.

## Authentication and Authorization

- Role-based authentication is implemented using JWT tokens.
- Admin users have access to create, edit, and delete blogs.
- Regular users can view all blogs and individual blog posts.

## API Documentation

- GET /blogs: Retrieve a list of all blogs.
- GET /blogs?keywords=keyword1&keywords=keyword2: Retrieve a list of all blogs with search mutiple search query.
- GET /blogs/:id: Retrieve details of a specific blog.
- POST /blogs: Create a new blog (Admin only).
- PUT /blogs/:id: Update an existing blog (Admin only).
- DELETE /blogs/:id: Delete a blog (Admin only).
- POST /auth/signup: Create a new blog (Admin only).
- POST /auth/signin: Create a new blog (Admin only).
- POST /auth/signout: Create a new blog (Admin only).

  For detailed request and response examples, refer to API Documentation which added to this project.

## Frontend Deployment
- Deploy the backend to an AWS EC2 instance.
- Build the frontend for production:
  npm run build
  pm2 start pm2 start npm --name "dapps-frontend" -- start
  - Access the deployed frontend at http://your-backend-ip:####.

## Backend Deployment
- Deploy the backend to an AWS EC2 instance.
- Build the backend for production:
  npm run build
  pm2 start dist/main.js --name "backend"
- Access the deployed backend at http://your-backend-ip:####.

## Notes

1. SEO with Server-Side Rendering

- Use Next.js's server-side rendering for better SEO.
- Implement static generation for read-only blog content.

2. Client-Side Rendering for Admin Operations

- Use Next.js client-side rendering for administration section.
- Perform create, delete, and update operations on the client.

3. AWS Configuration

- Configure AWS credentials in your environment or AWS CLI for deployment.

- Create an S3 Bucket:

* Log in to your AWS account.
* Go to the S3 service.
* Create a new bucket with a unique name.
* Configure the bucket permissions to allow public read access for the images by setting the rules and enable cors policy
* Generate Access Key & Access Secret by using IAM credentials.

Set the AWS_ACCESS_KEY_ID and AWS_ACCESS_KEY_SECRET environment variables in your backend .env file.

4. Start Frontend & Backend with PM2

- Install PM2 globally:
  npm install -g pm2

- Start frontend and backend using PM2:
  pm2 start dist/main.js --name "backend"
  pm2 start npm --name "dapps-frontend" -- start

- Access the running processes with:
  pm2 list

- Monitor logs with:
  pm2 logs
