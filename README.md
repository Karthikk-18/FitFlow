# Fitness Tracker 🏋️‍♂️

A fitness tracking open source application.

This is an **MVP-first project** — features are added incrementally and tested properly.

---

## 🚀 MVP Feature 1: Store Workouts & Exercises

### ✅ What’s Implemented

The first MVP allows a **user to store workouts and their exercises**.

**Core capabilities:**
- Create a workout for a user
- Add multiple exercises to a workout
- Persist data using a relational database
- Clean separation of concerns using layered architecture

---

## 🧱 Architecture

The project follows a standard backend structure:


## Setup

1. Clone the repository

3. Edit `.env` and add your Supabase credentials
4. Run the application
```bash
   ./mvnw spring-boot:run
```

## Environment Variables

- `SUPABASE_DB_URL` - Your Supabase database URL
- `SUPABASE_DB_USER` - Your Supabase database username
- `SUPABASE_DB_PASSWORD` - Your Supabase database password
