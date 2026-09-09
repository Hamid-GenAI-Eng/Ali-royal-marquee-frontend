export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  tier: 'VIP' | 'Standard' | 'Corporate';
  totalSpent: number;
};

export type EnquiryStatus = 'New' | 'Contacted' | 'Qualified' | 'Scheduled' | 'Quoted' | 'Negotiating' | 'Converted' | 'Lost';

export type Enquiry = {
  id: string;
  customerId: string; // Required link to customer
  name?: string;       // Prospect name
  phone?: string;      // Prospect phone
  eventName: string;
  type?: string;       // Event type
  hall?: string;       // Preferred hall
  dateStr: string;
  guests: number;
  status: EnquiryStatus;
  assignedTo: string;
  createdAt: string;
};

export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
export type PaymentStatus = 'Paid' | 'Partial' | 'Unpaid';

export type Booking = {
  id: string;
  customerId: string;
  eventId?: string; // Links to Event if generated
  hall: 'Grand Ballroom' | 'Royal Marquee' | 'Lawn';
  dateStr: string;
  shift: 'Day' | 'Night';
  guests: number;
  totalAmount: number;
  paidAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Draft';

export type Event = {
  id: string;
  bookingId: string;
  title: string;
  dateStr: string;
  startTime: string;
  endTime: string;
  status: EventStatus;
  manager: string;
  readinessScore?: number;
};

export type Payment = {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  method: 'Cash' | 'Bank Transfer' | 'Card' | 'Cheque';
  status: 'Completed' | 'Pending' | 'Failed';
  dateStr: string;
  reference: string;
};


export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactName: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

export interface Expense {
  id: string;
  dateStr: string;
  category: string;
  description: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  paymentStatus?: 'Paid' | 'Unpaid';
  vendorId?: string;
  bookingId?: string;
}

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

export type StaffRole = 'Manager' | 'Supervisor' | 'Waiter' | 'Chef' | 'Security';
export type Staff = {
  id: string;
  name: string;
  role: StaffRole;
  phone: string;
  shift: 'Morning' | 'Evening' | 'Night';
  status: 'Active' | 'On Leave' | 'Inactive';
  salary?: number;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'info' | 'warning' | 'success';
  read: boolean;
  link?: string;
  timestamp: string;
};

export type Package = {
  id: string;
  name: string;
  type: string;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  minGuests?: number;
};
