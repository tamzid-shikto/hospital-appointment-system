# Spiral 3 – MedCore Hospital Management System

## 1. Objective

The objective of Spiral 3 was to improve the frontend user interface of the MedCore Hospital Management System and connect the contact page with the backend. This phase focused on making the remaining pages consistent with the MedCore design and improving the overall user experience.

## 2. Work Completed

### 2.1 About Page

The About page was redesigned to match the overall MedCore website style.

The page includes:

* About MedCore introduction
* Mission, vision, and core values
* Healthcare impact statistics
* Call-to-action section
* Navigation links to other pages
* Separate `about.css` stylesheet

### 2.2 Contact Page

The Contact page was improved with a cleaner and more organized interface.

It includes:

* Contact information
* Full Name field
* Email field
* Subject field
* Message field
* Send Message button
* Separate `contact.css` stylesheet

The contact form was also connected to the backend API so submitted messages can be stored in the database.

### 2.3 Services Page

The Services page was redesigned to provide a cleaner presentation of the hospital's medical specialties.

The page includes:

* Cardiology
* Neurology
* Pediatrics
* Orthopedics
* Dermatology
* Appointment call-to-action section

### 2.4 FAQ Page

The FAQ page was redesigned to make it more interactive and visually appealing.

The page includes:

* Frequently asked questions
* Expandable question-and-answer sections
* Plus/minus interaction for each question
* Contact support section
* Appointment/navigation links

The FAQ uses HTML `<details>` and `<summary>` elements, so no additional JavaScript is required for the expandable questions.

### 2.5 Doctor Images

The doctor images were reorganized into the `public/images/` directory so that they can be correctly loaded by the website.

The image paths in the Doctors page were updated accordingly.

### 2.6 Backend Contact API

A contact API endpoint was added to the backend to handle messages submitted through the Contact page.

The endpoint receives:

* Name
* Email
* Subject
* Message

The submitted contact information is stored using the existing database functions.

## 3. Files Added or Modified

### Frontend

* `public/about.html`
* `public/about.css`
* `public/contact.html`
* `public/contact.css`
* `public/services.html`
* `public/faq.html`
* `public/doctors.html`
* `public/images/doctor-1.jpg` through `doctor-32.jpg`

### Backend

* `server/api.js`

## 4. Result

After completing Spiral 3, the major frontend pages have a more consistent MedCore design and improved usability. The Doctors page can correctly load its images, the FAQ page provides interactive questions and answers, and the Contact page is connected to the backend for message submission.

## 5. Future Work

Future development can focus on:

*Additional healthcare features can be added in future iterations.
*More advanced patient and doctor management can be introduced.
*Notifications and reminders could be integrated.
*Additional reporting and analytics features could be added.
*The system can be expanded based on future requirements.
