# Student Job Board

A mini job board web application built with **Vanilla JavaScript**.
Users can search, filter, save, and apply to jobs with a clean and responsive interface.

---

## Live Demo

🔗 https://AsalShahani.github.io/student-job-board

---

## Features

* 🔎 Search jobs by title
* 📍 Filter jobs by location
* 💼 Filter jobs by job type
* ❤️ Save jobs to favorites
* 🗑 Remove saved jobs
* 💾 Persistent favorites using LocalStorage
* 📄 Job details modal
* ✅ Apply button with visual feedback
* 📱 Responsive grid layout

---

## Technologies Used

* HTML5
* CSS3 (Flexbox & Grid)
* Vanilla JavaScript
* LocalStorage API
* Font Awesome Icons

---

## Project Structure

```
student-job-board
│
├── index.html
├── style.css
└── script.js
```

---

## How It Works

The application renders job cards dynamically using JavaScript.

### Rendering Jobs

Jobs are stored in a dataset and rendered into the DOM.

### Filtering Logic

Filters combine multiple conditions:

* job type
* location
* search text

### State Management

Saved jobs are stored in **localStorage** so they persist after page refresh.

---

## Key JavaScript Concepts Used

* DOM manipulation
* Event listeners
* Array methods (`filter`, `find`, `some`)
* Dynamic rendering
* LocalStorage
* State management

---

## Screenshots

![Student Job Board Screenshot](https://github.com/user-attachments/assets/f50df47b-9c30-45ec-a75f-6b9409829dc0)


---

## Future Improvements

* Backend API integration
* Pagination
* Job categories
* Dark mode
* Apply form submission

---

## Author

Asal Shahani
Frontend Developer in Training
