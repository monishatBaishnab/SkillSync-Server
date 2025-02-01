# **SkillSync Server Overview**  

## **Overview**  
The **SkillSync** server is built using **Node.js and Express.js**, with **Prisma ORM** managing the database operations. It handles user authentication, skill management, session scheduling, availability tracking, and reviews.  

The backend follows a **RESTful API structure** with JWT-based authentication and role management. PostgreSQL is used as the relational database, ensuring **efficient data handling** and **structured relationships** between users, skills, sessions, and reviews.  

---

## **Database Schema & Relationships**  

- **User** (`users`): Stores user details, role (Learner/Teacher/Admin), and profile information.  
- **Skill** (`skills`): Represents teachable skills with categories and user relations.  
- **Session** (`sessions`): Manages booked learning sessions, linking teachers, learners, and skills.  
- **Availability** (`availabilities`): Stores teacher availability slots to prevent conflicts.    

### **Schema Relations:**  
- A **User** can have multiple **Skills**.  
- A **Skill** can have multiple **Sessions** and **Availability** slots.  
- A **Session** connects a **Teacher (User)** and a **Learner (User)** with a **Skill**.  

---

## **Server Setup**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/monishatBaishnab/SkillSync-Server.git
cd SkillSync-Server
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Set Up Environment Variables**  
Create a `.env` file in the root directory and add the following:  
```env
DATABASE_URL="your_postgres_database_url"
PORT=8000
JWT_SECRET="your_secret_key"
CLOUDINARY_API_SECRET="your_cloudinary_secret"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"

```

### **4. Run Database Migrations**  
```bash
npx prisma migrate dev
```

### **5. Start the Server**  
```bash
npm run start:dev
```

---

## **API Endpoints**  

### **User Authentication**  
- `POST /api/auth/signup` – Register a new user  
- `POST /api/auth/login` – User login and JWT token generation  
- `POST /api/auth/profile-update` – User profile update

### **Skill Management**  
- `POST /api/skills` – Add a new skill  
- `GET /api/skills` – Get all skills  
- `PUT /api/skills/:id` – Update a skill  
- `DELETE /api/skills/:id` – Remove a skill  

### **Session Booking**  
- `POST /api/sessions` – Book a learning session  
- `GET /api/sessions` – View all scheduled sessions  
- `PUT /api/sessions/:id` – Update session status  
- `DELETE /api/sessions/:id` – Cancel a session  

### **Teacher Availabilities**  
- `POST /api/availabilities` – Book a learning availability  
- `GET /api/availabilities` – View all scheduled availabilities  
