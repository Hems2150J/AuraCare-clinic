import React, { createContext, useContext, useState, useEffect } from 'react';
import { reviewsData as initialReviewsData } from '../data/reviewsData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTabState] = useState('home');
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [activeTelehealthSession, setActiveTelehealthSession] = useState(null);
  const [prescriptionDownloadDoctor, setPrescriptionDownloadDoctor] = useState(null);

  // Cart state
  const [cart, setCart] = useState([
    { id: "prod-1", name: "Omron Evolv Wireless Blood Pressure Monitor", price: 89.99, quantity: 1, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80", requiresPrescription: false }
  ]);

  // Appointments state
  const [appointments, setAppointments] = useState([
    {
      id: "APT-88219",
      doctorName: "Dr. Evelyn Reed",
      department: "Cardiology",
      date: "2026-09-24",
      timeSlot: "11:30 AM",
      patientName: "Alexander Hayes",
      patientPhone: "+1 (555) 234-5678",
      reason: "Annual Cardiac Risk Screening & ECG",
      status: "Confirmed",
      fee: 120
    }
  ]);

  // Orders state
  const [orders, setOrders] = useState([
    {
      id: "ORD-99042",
      date: "2026-09-18",
      items: [{ name: "Derma-Repair Ceramide Cream", price: 42.00, quantity: 1 }],
      total: 42.00,
      status: "Out for Delivery",
      address: "124 Park Avenue, Apt 4B, New York, NY"
    }
  ]);

  // Reviews state
  const [reviewsList, setReviewsList] = useState(initialReviewsData.reviews);

  // Global Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast("Item removed from cart", 'info');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const addAppointment = (newAppt) => {
    const apptWithId = {
      ...newAppt,
      id: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Confirmed'
    };
    setAppointments((prev) => [apptWithId, ...prev]);
    showToast(`Appointment confirmed with ${newAppt.doctorName}`, 'success');
    return apptWithId;
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Placed'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const addReview = (newReview) => {
    const formatted = {
      id: `rev-${Date.now()}`,
      date: 'Just now',
      rating: Number(newReview.rating),
      verifiedVisit: true,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      ...newReview
    };
    setReviewsList((prev) => [formatted, ...prev]);
    showToast("Thank you! Your verified patient review has been published.", 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedDoctorForModal,
        setSelectedDoctorForModal,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isWriteReviewOpen,
        setIsWriteReviewOpen,
        appointments,
        addAppointment,
        orders,
        addOrder,
        reviewsList,
        addReview,
        activeTelehealthSession,
        setActiveTelehealthSession,
        prescriptionDownloadDoctor,
        setPrescriptionDownloadDoctor,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
