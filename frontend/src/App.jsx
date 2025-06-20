import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import ForgotPasswordForm from './components/auth/ForgetPasswordForm.jsx';
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserManagement from './components/ui/UserManagement.jsx';
import Sidebar from './components/ui/Sidebar.jsx';
import ChargingStation from './components/ui/ChargingStation.jsx';
import BookingHistory from './pages/BookingHistory.jsx';
import PaymentInfo from './pages/PaymentInfo.jsx';
import ManageStation from './components/ui/ManageStation.jsx';
import AddStationForm from './components/ui/AddStationForm.jsx';
import AllBookings from './components/ui/AllBookings.jsx';
import AdminTransactions from './components/ui/AdminTransaction.jsx';
import Charts from './pages/Charts.jsx';
import AdditionalInfo from './pages/AdditionalInfo.jsx';
import Working from './pages/Working.jsx';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/charging-station" element={<ChargingStation />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/payment-history" element={<PaymentInfo />} />
        <Route path="/manage-station" element={<ManageStation />} />
        <Route path="/admin/add-station" element={<AddStationForm />} />
        <Route path="/admin/bookings" element={<AllBookings />} />
        <Route path="charts" element={<Charts />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />
        <Route path="/works" element={<Working />} />
      </Routes>
    </Router>
  );
}

export default App;