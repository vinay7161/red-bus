import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { bookingService } from '../services/BookingServices';

const initialBookingState = {
  busId: '',
  journeyDate: '',
  source: '',
  destination: '',
  fare: 0,
  selectedSeats: [],
  passengers: [],
  totalAmount: 0,
};

const BookingContext = createContext(undefined);

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const setBookingInfo = (info) => {
    setBookingDetails((prev) => {
      if (!prev) {
        return { ...initialBookingState, ...info };
      }

      const updatedState = { ...prev, ...info };

      if (info.selectedSeats || info.fare) {
        updatedState.totalAmount = updatedState.fare * updatedState.selectedSeats.length;
      }

      return updatedState;
    });
  };

  const addPassenger = (passenger) => {
    setBookingDetails((prev) => {
      if (!prev) return null;

      const existingPassengerIndex = prev.passengers.findIndex(
        (p) => p.seatNumber === passenger.seatNumber
      );

      let updatedPassengers;

      if (existingPassengerIndex >= 0) {
        updatedPassengers = [...prev.passengers];
        updatedPassengers[existingPassengerIndex] = passenger;
      } else {
        updatedPassengers = [...prev.passengers, passenger];
      }

      return {
        ...prev,
        passengers: updatedPassengers,
      };
    });
  };

  const removePassenger = (seatNumber) => {
    setBookingDetails((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        passengers: prev.passengers.filter((p) => p.seatNumber !== seatNumber),
      };
    });
  };

  const proceedToPayment = async () => {
    try {
      if (!isAuthenticated) {
        toast.error('Please login to continue booking');
        navigate('/login');
        return;
      }

      if (!bookingDetails) {
        toast.error('Booking details not found');
        return;
      }

      if (bookingDetails.passengers.length === 0) {
        toast.error('Please add passenger details');
        return;
      }

      if (bookingDetails.passengers.length !== bookingDetails.selectedSeats.length) {
        toast.error('Please add details for all selected seats');
        return;
      }

      setLoading(true);
      setError(null);

      // Simulate order creation
      const orderResponse = await bookingService.createOrder(bookingDetails);

      // Simulate payment success
      setTimeout(() => {
        navigate('/payment-success');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment initiation failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setBookingDetails(null);
    setError(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingInfo,
        addPassenger,
        removePassenger,
        proceedToPayment,
        resetBooking,
        loading,
        error,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
