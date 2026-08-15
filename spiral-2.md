# Spiral 2 – MedCore Hospital Appointment System

## Objective

The objective of Spiral 2 was to develop the main frontend pages and integrate them with the provided backend APIs and Firebase database.

## Work Completed

### 1. Doctors Page

- Developed the Doctors page with a responsive doctor-card layout.
- Added doctors categorized by medical specialty.
- Added Bangladeshi doctors used in the frontend to the Firebase database.
- Connected the Doctors page to the backend Doctors API.
- Doctor information is loaded dynamically from the database.
- Added specialty-based filtering for doctors.

### 2. Appointment Page

- Developed the appointment booking interface.
- Added medical specialty selection.
- Doctor selection is dynamically based on the selected specialty.
- Connected the page with the backend appointment APIs.
- Added doctor availability based on the selected date.
- Available appointment time slots are retrieved from the backend.
- Successfully booked appointments are stored in Firebase.
- Already-booked time slots are removed from the available slots.
- Duplicate appointment slots are prevented by the backend.

### 3. Sign In

- Developed the MedCore Sign In page.
- Connected the page to the `/api/auth/login` API.
- Implemented login using email and password.
- Successful login returns the user ID and authentication token.
- User ID and token are stored in local storage.

### 4. Sign Up

- Developed the MedCore Sign Up page.
- Connected the page to the `/api/auth/register` API.
- Implemented registration using name, email, and password.
- Successfully registered users are stored in Firebase.
- Added navigation between Sign Up and Sign In pages.

## API Integration

The following backend APIs were integrated:

- `GET /api/doctors`
- `GET /api/doctors/:doctorId`
- `GET /api/doctors/:doctorId/availability`
- `POST /api/appointments`
- `GET /api/appointments`
- `GET /api/appointments/:appointmentId`
- `POST /api/auth/login`
- `POST /api/auth/register`

## Database Integration

Firebase Realtime Database was used for storing and retrieving:

- Doctors
- Users
- Appointments

The frontend communicates with the backend API, while the backend handles communication with the Firebase database.

## Testing

The following functionality was tested successfully:

- Doctor information loading
- Specialty-based doctor selection
- Doctor availability
- Appointment booking
- Prevention of duplicate appointment slots
- User registration
- User login
- Firebase data storage
- Navigation between frontend pages

## Frontend Structure

The Spiral 2 frontend pages and their associated CSS files were organized inside the `public` directory.

```text
public/
├── index.html
├── style.css
├── appointment.html
├── appointment.css
├── doctors.html
├── doctors.css
├── signin.html
├── signin.css
├── signup.html
└── images/