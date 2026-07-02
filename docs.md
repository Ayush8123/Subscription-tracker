# Subscription Tracker API Documentation

A secure backend API for managing recurring subscriptions, tracking renewals, and automating expiry reminders.

## Base URL

```text
https://your-api-url.com/api/v1
```

## Authentication

This API uses **JWT Authentication** for protected routes.

Protected endpoints require:

```text
Authorization: Bearer <token>
```

---

# Authentication Endpoints

## 1. Sign Up

### Endpoint

```http
POST /auth/sign-up
```

### Description

Registers a new user.

### Request Body

```json
{
  "username": "ayush",
  "email": "ayush@example.com",
  "password": "securepassword"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## 2. Sign In

### Endpoint

```http
POST /auth/sign-in
```

### Description

Authenticates user and returns JWT token.

### Request Body

```json
{
  "email": "ayush@example.com",
  "password": "securepassword"
}
```

### Success Response

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

---

## 3. Sign Out

### Endpoint

```http
POST /auth/sign-out
```

### Description

Logs out the authenticated user.

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# User Endpoints

## 1. Get All Users

### Endpoint

```http
GET /users
```

### Access

Protected

### Description

Returns all registered users.

---

## 2. Get User by ID

### Endpoint

```http
GET /users/:id
```

### Access

Protected

### Description

Fetches details of a specific user.

### Params

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | String | User ID     |

---

## 3. Delete User

### Endpoint

```http
DELETE /users/:id
```

### Description

Deletes a user.

---

# Subscription Endpoints

## Subscription Object

```json
{
  "name": "Netflix",
  "price": 499,
  "currency": "INR",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentmethod": "UPI",
  "status": "active",
  "startdate": "2026-07-01",
  "renewaldate": "2026-08-01",
  "user": "user_id"
}
```

---

## 1. Create Subscription

### Endpoint

```http
POST /subscriptions
```

### Access

Protected

### Description

Creates a new subscription for the logged-in user.

### Request Body

```json
{
  "name": "Spotify",
  "price": 119,
  "currency": "INR",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentmethod": "Credit Card",
  "startdate": "2026-07-01"
}
```

### Features

* Auto-calculates renewal date if not provided
* Auto-updates status if expired

---

## 2. Get All Subscriptions

### Endpoint

```http
GET /subscriptions
```

### Description

Fetches all subscriptions (Admin only).

---

## 3. Get Subscription by ID

### Endpoint

```http
GET /subscriptions/:id
```

### Description

Returns a specific subscription.

---

## 4. Update Subscription

### Endpoint

```http
PUT /subscriptions/:id
```

### Description

Updates subscription details.

### Updatable Fields

* name
* price
* paymentmethod
* frequency
* category
* status

---

## 5. Delete Subscription

### Endpoint

```http
DELETE /subscriptions/:id
```

### Description

Deletes a subscription permanently.

---

## 6. Get User Subscriptions

### Endpoint

```http
GET /subscriptions/user/:id
```

### Access

Protected

### Description

Fetches all subscriptions belonging to a specific user.

---

## 7. Cancel Subscription

### Endpoint

```http
PUT /subscriptions/:id/cancel
```

### Description

Marks subscription as cancelled.

### Response

```json
{
  "success": true,
  "message": "Subscription cancelled successfully"
}
```

---

## 8. Upcoming Renewals

### Endpoint

```http
GET /subscriptions/upcoming-renewals
```

### Description

Returns subscriptions that are close to renewal.

Useful for:

* Sending reminder emails
* Dashboard alerts
* Payment tracking

---

# Validation Rules

## Name

* Required
* Min: 2 characters
* Max: 100 characters

## Price

* Min: 0
* Max: 1000

## Currency

Allowed:

* INR
* USD
* EUR

## Frequency

Allowed:

* daily
* weekly
* monthly
* yearly

## Category

Allowed:

* sports
* news
* entertainment
* lifestyle
* other

## Status

Allowed:

* active
* cancel
* expired

## Dates

* Start date cannot be in future
* Renewal date must be after start date

---

# Security Features

* JWT-based authentication
* Protected user routes
* User-specific resource access
* Bot protection using Arcjet
* Rate limiting
* Abuse prevention

---

# Automated Email Notifications

Uses Nodemailer + scheduled jobs to:

* Send pre-renewal reminders
* Notify upcoming expiry
* Improve user retention

---

# Status Codes

| Code | Meaning          |
| ---- | ---------------- |
| 200  | Success          |
| 201  | Resource Created |
| 400  | Validation Error |
| 401  | Unauthorized     |
| 403  | Forbidden        |
| 404  | Not Found        |
| 500  | Server Error     |
