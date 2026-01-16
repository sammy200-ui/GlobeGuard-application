# GlobeGuard – Global Scam Awareness & Reporting App

Map-based scam awareness and reporting platform. Protecting travelers and digital citizens from fraud through community-driven alerts.

## 📹 Demo Video
**Watch the full app demonstration:** [GlobeGuard Demo Video](https://drive.google.com/file/d/17axn7JenUWlxKByobK-SK9ZxXpyhfh0B/view?usp=sharing)

## Features
- 📍 **Location-Based Alerts**: Real-time warnings when entering high-risk scam areas.
- 📝 **Community Reporting**: Submit reports about new scams to warn others.
- 🌐 **Online Safety**: Comprehensive database of digital and financial fraud tactics.
- 🗺️ **Interactive Map**: Visualize scam hotspots globally.
- 🔒 **Verification System**: Upvote system to validate community reports.

## Technology Stack
- **Frontend**: React Native (Expo)
- **Backend**: Node.js, Express
- **Database**: MySQL (Prisma ORM)
- **API**: Custom REST API

## Getting Started

### Prerequisites
- Node.js
- MySQL

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   DATABASE_URL="mysql://root:password@localhost:3306/GlobeGuard"
   PORT=3001
   JWT_SECRET="your_secret_key"
   ```
4. Push database schema:
    ```bash
    npx prisma db push
    ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
