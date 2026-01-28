# Personal Journaling API

A robust backend for a journaling application featuring secure user authentication and full CRUD capabilities.

## 🚀 Tech Stack
- **Backend:** Java 17, Spring Boot 3
- **Database:** MongoDB
- **Security:** Spring Security with BCrypt password encoding
- **Frontend:** HTML5, Bootstrap 5, JavaScript (Fetch API)

## ✨ Key Features
- **User Authentication:** Secure Signup and Login flow.
- **Ownership Protection:** Users can only view, edit, or delete their own entries.
- **Global Error Handling:** Centralized exception management for clean API responses.
- **Responsive UI:** Clean dashboard for managing personal thoughts.

## 🛠️ How to Run
1. Clone the repo.
2. Ensure MongoDB is running on port 27017.
3. Update `application.properties` with your credentials.
4. Run `mvn spring-boot:run`.
