# MedCore – Hospital Appointment System

MedCore is a simple healthcare management web app. Patients can browse doctors, book appointments, and contact the clinic. It has a static HTML/CSS/JS frontend and an Express.js backend API.

## Features

- Home, About, Services, Doctors, FAQ, and Contact pages
- Sign up / Sign in for patients
- Book an appointment by specialty, doctor, date, and time
- View real-time doctor availability
- Contact form to send messages to the clinic

## Project Structure

```
public/
  index.html        Home page
  about.html         About page
  services.html      Services page
  doctors.html       Doctors listing
  appointment.html    Appointment booking
  contact.html        Contact form
  faq.html            FAQ page
  signin.html          Sign in
  signup.html          Sign up

index.js             Express server entry point
api.js                API routes
database.js           Database helper (read/write)
```

## Tech Stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js, Express
- **Database:** Firebase Realtime Database (via `ReadDatabase` / `PushDatabase` helpers)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file with your Firebase/database credentials (used by `database.js`).

### 3. Run the server
```bash
node index.js
```
The server runs on `http://localhost:3000` by default (or `process.env.PORT`).

### 4. Open the app
Serve or open the files in `public/` in your browser, or visit the server's static route if it serves the frontend directly.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Log in a user |
| GET  | `/api/doctors` | List all doctors |
| GET  | `/api/doctors/:doctorId` | Get a single doctor |
| GET  | `/api/doctors/:doctorId/availability?date=YYYY-MM-DD` | Get available time slots for a doctor on a date |
| POST | `/api/appointments` | Book an appointment |
| GET  | `/api/appointments` | List all appointments |
| GET  | `/api/appointments/:appointmentId` | Get a single appointment |
| POST | `/api/contact` | Submit a contact form message |

## Known Issues

- `signin.html` redirects to a hardcoded local URL (`http://127.0.0.1:5500/...`) after login — update for production.
- Passwords are stored and compared in plain text in `api.js` — should be hashed (e.g. with bcrypt).
- The login token is a placeholder string (`"jwt_token"`) rather than a real JWT.

## Contributors

- Kazi Md. Tamzid Shikto (2203007)
- Humayra Islam Maysha (2203008)
- Md. Rohanul Hasan Rijon (2203009)
