import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { 
  Customer, Enquiry, Booking, Event, Payment, Expense, 
  InventoryItem, Vendor, Staff, Notification 
} from '../types';
import { 
  mockCustomers, mockEnquiries, mockBookings, mockEvents, mockPayments, 
  mockExpenses, mockInventory, mockVendors, mockStaff, mockNotifications 
} from '../services/mockData';

interface MockDataContextType {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
  addEnquiry: (enquiry: Enquiry) => void;
  updateEnquiry: (id: string, enquiry: Partial<Enquiry>) => void;
  deleteEnquiry: (id: string) => void;

  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;

  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  addPayment: (payment: Payment) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  deletePayment: (id: string) => void;

  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;

  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;

  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  addStaff: (member: Staff) => void;
  updateStaff: (id: string, member: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;

  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const createCrudHandlers = <T extends { id: string }>(
    setItems: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    return {
      add: (item: T) => setItems(prev => [item, ...prev]),
      update: (id: string, partial: Partial<T>) => setItems(prev => 
        prev.map(item => item.id === id ? { ...item, ...partial } : item)
      ),
      remove: (id: string) => setItems(prev => prev.filter(item => item.id !== id))
    };
  };

  const customerHandlers = createCrudHandlers<Customer>(setCustomers);
  const enquiryHandlers = createCrudHandlers<Enquiry>(setEnquiries);
  const bookingHandlers = createCrudHandlers<Booking>(setBookings);
  const eventHandlers = createCrudHandlers<Event>(setEvents);
  const paymentHandlers = createCrudHandlers<Payment>(setPayments);
  const expenseHandlers = createCrudHandlers<Expense>(setExpenses);
  const inventoryHandlers = createCrudHandlers<InventoryItem>(setInventory);
  const vendorHandlers = createCrudHandlers<Vendor>(setVendors);
  const staffHandlers = createCrudHandlers<Staff>(setStaff);
  
  const notificationHandlers = createCrudHandlers<Notification>(setNotifications);
  const markNotificationRead = (id: string) => notificationHandlers.update(id, { read: true });
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <MockDataContext.Provider value={{
      customers, setCustomers, addCustomer: customerHandlers.add, updateCustomer: customerHandlers.update, deleteCustomer: customerHandlers.remove,
      enquiries, setEnquiries, addEnquiry: enquiryHandlers.add, updateEnquiry: enquiryHandlers.update, deleteEnquiry: enquiryHandlers.remove,
      bookings, setBookings, addBooking: bookingHandlers.add, updateBooking: bookingHandlers.update, deleteBooking: bookingHandlers.remove,
      events, setEvents, addEvent: eventHandlers.add, updateEvent: eventHandlers.update, deleteEvent: eventHandlers.remove,
      payments, setPayments, addPayment: paymentHandlers.add, updatePayment: paymentHandlers.update, deletePayment: paymentHandlers.remove,
      expenses, setExpenses, addExpense: expenseHandlers.add, updateExpense: expenseHandlers.update, deleteExpense: expenseHandlers.remove,
      inventory, setInventory, addInventoryItem: inventoryHandlers.add, updateInventoryItem: inventoryHandlers.update, deleteInventoryItem: inventoryHandlers.remove,
      vendors, setVendors, addVendor: vendorHandlers.add, updateVendor: vendorHandlers.update, deleteVendor: vendorHandlers.remove,
      staff, setStaff, addStaff: staffHandlers.add, updateStaff: staffHandlers.update, deleteStaff: staffHandlers.remove,
      notifications, setNotifications, addNotification: notificationHandlers.add, markNotificationRead, markAllNotificationsRead
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
