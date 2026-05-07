# Complaint Registration Portal

A modern, responsive complaint registration system with a Node.js Express backend and a premium glassmorphism frontend.

## 🚀 How to Run

### 1. Setup the Backend
Open your terminal and navigate to the `Backend` folder:
```bash
cd Backend
npm install
npm start
```
The server will start at: `http://localhost:5000`

### 2. Open the Frontend
Simply open the `Frontend/index.html` file in any modern web browser.
- Or use an extension like **Live Server** in VS Code.

## 🛠 Features
- **Modern UI**: Premium glassmorphism design with animated background blobs.
- **Form Validation**: Real-time character counting and field validation.
- **API Integration**: Connects to the local Express server to store and retrieve complaints.
- **Mobile Responsive**: Works perfectly on mobile and tablet devices.

## 📡 API Endpoints
- `GET /complaints`: Fetch all submitted complaints.
- `POST /complaints`: Submit a new complaint (JSON body).
- `GET /complaints/:id`: Get a specific complaint.
- `DELETE /complaints/:id`: Delete a complaint.

## 📂 Project Structure
- `Backend/`: Node.js + Express API.
- `Frontend/`: HTML, CSS, and Vanilla JS.
