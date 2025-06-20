# ChargeEV ⚡

**Powering your journey with smart station discovery**

A full‑stack EV charging platform that helps users discover, book, and pay for EV charging slots, while enabling admins to manage stations and monitor transactions.

---

## 🚀 Demo / Screenshots

> HomPage ![image](https://github.com/user-attachments/assets/02d3e2df-7ebe-4e95-909c-5b0bd10e9577)
> LoginPage ![image](https://github.com/user-attachments/assets/d2f08823-751d-41ae-8cf0-8b4520209401)
> ChargingStation ![image](https://github.com/user-attachments/assets/2728ce54-8ce5-40b8-bde6-41a77bde00a6)
> BookingHistory ![image](https://github.com/user-attachments/assets/c2a0b3a4-0790-4688-a2df-996c4024cb1c)
> AdminTransactionHistory ![image](https://github.com/user-attachments/assets/0b58f455-bddf-49a8-ba33-65fc337406bc)
> AdminAddStation ![image](https://github.com/user-attachments/assets/95d73459-f6ad-47e4-bd4c-cf02d90275e3)





---

## 🎯 Features

### 🧑‍💻 User
- 🔍 Search and filter charging stations
- 🧾 Book a slot with connector type and time duration
- ⏰ Bell notification when booking nears expiry
- 💳 Pay on completion and view history
- 📊 View personal stats via attractive bar/pie charts
- 🔐 Secure authentication (login/register)

### 🛠️ Admin
- 🧑‍💼 Role-based protected access
- ➕ Add and manage stations
- 🗂️ View all bookings and cancel if needed
- 💰 Track total income and minutes used today

---

## 🧩 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Recharts  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)  
- **Auth**: JWT-based authentication, separate user/admin routes  
- **Image Uploads**: Cloudinary  
- **Email Notifications**: Nodemailer

---

## 🔧 Getting Started (Local Setup)

### 1. Clone the repo
```bash
git clone https://github.com/deepika-agrawal16/ChargeEv.git
cd ChargeEv

```
### 2. Backend
```bash
cd backend
npm install mongoose express cookie-parser nodemon dotenv 

create a .env file
PORT=
MONGO_URI=
JWT_SECRET=your_jwt_secret_key

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

then npm start

```
### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev

```
