# Scam Awareness App

A mobile-first application built with **React Native (Expo)** for the frontend and **Node.js + Express + MongoDB** for the backend.  
The app helps users stay aware of scams happening around the world, check scams by location, and report new ones.  
Login/Signup is supported for personalization and bookmarking.

---

## 📱 App Screen Plan

### 1. Home Screen (Trending Scams)
- Shows trending scams (latest + most reported).
- Feed-style list (card per scam).
- Filter by type (Online, Travel, Finance, Other).
- **CTA:** “Report Scam” (floating button or header option).
- ✅ **Purpose:** Quick glance at what’s happening worldwide.

---

### 2. Search by Location (Map + List)
- Map view OR simple search bar.
- Enter a city/region OR tap on a map pin.
- Displays scams reported in that location (list of scam cards).
- Each card links to a **Scam Details Screen**.
- ✅ **Purpose:** Check “What scams to expect in *X* place?”

---

### 3. Report Scam Screen
- Form for users to submit a scam report.
  - Title  
  - Scam Type (dropdown: Travel / Online / Financial / Other)  
  - Location (text input or map select)  
  - Description  
- Submit → stored in DB (after backend integration).
- ✅ **Purpose:** Community-driven growth of scam database.

---

### 4. Login / Signup Page
- Users can create an account or log in.
- Benefits:  
  - Save their submitted scams.  
  - Bookmark scams to view later.  
  - Personalize scam alerts (push notifications).  
- ✅ **Purpose:** Enable personalization and secure access.

---

## 🛠 Tech Stack
**Frontend:** React Native (Expo), Context API/Zustand for state management, Tailwind for styling.  
**Backend:** Node.js, Express, MongoDB, JWT Authentication.  
**AI (future):** Scam text classification (categorize scam reports).  

---

## 🚀 Roadmap
- [ ] Setup React Native frontend (Expo).  
- [ ] Build backend with Express + MongoDB.  
- [ ] Implement authentication (Login/Signup).  
- [ ] Add Home + Search + Report + Auth screens.  
- [ ] Connect frontend with backend APIs.  
- [ ] Optional: AI-powered scam categorization.  


# Scam Awareness App – Firebase Integration

This project uses **Firebase** as a backend-as-a-service for authentication, database, and optional storage.  
Since this project focuses mainly on frontend (React Native + Expo), Firebase eliminates the need for a custom backend while still providing full functionality.

---

## 🔹 Firebase Services Used

### 1. Authentication (Firebase Auth)
- Handles **Login / Signup** flows.  
- Supports email/password login.  
- Stores secure user sessions.  

### 2. Database (Cloud Firestore)
- Stores **scam reports** and **user data**.  
- Example collections:
```plaintext
users/
  userId/
    email: "user@example.com"
    savedScams: [scamId1, scamId2]

scams/
  scamId1/
    title: "Fake Taxi Scam"
    type: "Travel"
    location: "Bangkok, Thailand"
    description: "Tourists are overcharged for short rides."
    reportedBy: "userId"
    timestamp: <serverTimestamp>


3. **Storage (Optional)**
- For uploading screenshots/images of scams.  

4. **Push Notifications (Optional)**
- Expo + Firebase Cloud Messaging for alerts.  

---

### How Firebase Fits the App
| App Feature                     | Firebase Service                   |
|---------------------------------|----------------------------------|
| Login / Signup                  | Firebase Auth                     |
| Save / Bookmark scams           | Firestore `users.savedScams`      |
| Submit new scam report          | Firestore `scams` collection      |
| View trending scams             | Firestore queries                 |
| Search scams by location        | Firestore queries with `location` |
| Upload scam screenshots/images  | Firebase Storage (optional)       |
| Push notifications              | Firebase Cloud Messaging (optional)|

---

## 🚀 Roadmap / Next Steps

1. **Frontend Setup**
 - Install Expo & initialize project  
 - Setup folder structure: `screens/`, `components/`, `navigation/`, `context/`, `services/`  

2. **Firebase Setup**
 - Install Firebase SDK:  
   ```bash
   npm install firebase
   ```  
 - Initialize Firebase (`firebaseConfig.js`)  
 - Setup Auth flow (Login / Signup)  

3. **CRUD Operations**
 - Read trending scams from Firestore  
 - Submit new scam reports  
 - Save / bookmark scams  
 - Search scams by location  

4. **UI Development**
 - Home Screen  
 - Search Screen  
 - Report Scam Screen  
 - Scam Details Screen  




