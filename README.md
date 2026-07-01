# Subscription Tracker

A backend application to manage and track user subscriptions efficiently. It allows users to create, update, cancel, and monitor subscriptions while keeping track of upcoming renewals. The project focuses on authentication, authorization, and structured API design.

## Features

- User authentication (Sign Up, Sign In, Sign Out)
- Create and manage subscriptions
- Track upcoming subscription renewals
- Cancel active subscriptions
- View user-specific subscriptions
- Secure API access with JWT authentication
- Centralized error handling and middleware support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## Project Structure

```bash
SubscriptionTracker/
├── DATABASE/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
```

### Structure Overview
- DATABASE/ → Database connection setup
- config/ → Environment variables and Arcjet configuration
- controllers/ → Business logic for users, auth, and subscriptions
- middlewares/ → Authentication, authorization, and error handling
- models/ → Database schemas

### Environment Variables

Create a .env file and add:

- PORT=
- MONGO_URI=
- JWT_SECRET=
- ARCJET_KEY=
