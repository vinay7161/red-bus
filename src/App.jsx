import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Home from './page/Home';
import BusDetails from './page/BusDetails';
import SeatSelection from './page/SeatSelection';
import Login from './page/Login ';
import BusSearch from './page/BusSearch';
import Confirmation from './page/Confirmation ';
import Checkout from './page/Checkout ';
import ProtectedRoute from './components/auth/ProtectedRoute ';
import PaymentSuccess from './page/PaymentSuccess';
import MyBookings from './page/MyBookings';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<BusSearch />} />
                <Route path="/bus/:busId" element={<BusDetails />} />
                <Route path="/bus/:busId/seats" element={<SeatSelection />} />
                <Route path="/confirmation" element={<Confirmation />} />
                
                {/* Protected Routes */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/payment-success" element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/my-bookings" element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                } />

                <Route path="/login" element={<Login/>} />
              </Routes>
            </main>
            <Footer/>
          </div>
          <Toaster position="top-center" />
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
