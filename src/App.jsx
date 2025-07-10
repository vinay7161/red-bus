import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import BusDetails from './pages/BusDetails';
// import SeatSelection from './pages/SeatSelection';
// import Checkout from './pages/Checkout';
// import PaymentSuccess from './pages/PaymentSuccess';
// import MyBookings from './pages/MyBookings';
// import Login from './pages/Login';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import Confirmation from './pages/Confirmation';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Home from './page/Home';

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
                {/* <Route path="/search" element={<BusSearch />} />
                <Route path="/bus/:busId" element={<BusDetails />} />
                <Route path="/bus/:busId/seats" element={<SeatSelection />} />
                <Route path="/confirmation" element={<Confirmation />} /> */}
                
                {/* Protected Routes */}
                {/* <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } /> */}
                {/* <Route path="/payment-success" element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                } /> */}
                {/* <Route path="/my-bookings" element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                } /> */}

                {/* <Route path="/login" element={<Login />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
