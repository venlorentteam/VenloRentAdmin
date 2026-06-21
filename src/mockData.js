export const users = [
  {
    id: "USR001",
    fullName: "Chinedu Okafor",
    email: "chinedu@venlorent.com",
    phone: "08031234567",
    role: "Agent",
    verificationStatus: "Verified",
    status: "Active",
    joinedAt: "2026-05-10"
  },
  {
    id: "USR002",
    fullName: "Amina Bello",
    email: "amina@gmail.com",
    phone: "08087654321",
    role: "Customer",
    verificationStatus: "Pending",
    status: "Active",
    joinedAt: "2026-06-01"
  },
  {
    id: "USR003",
    fullName: "Emeka Obi",
    email: "emeka@gmail.com",
    phone: "08011112222",
    role: "Agent",
    verificationStatus: "Verified",
    status: "Suspended",
    joinedAt: "2026-04-15"
  },
  {
    id: "USR004",
    fullName: "Fatima Lawal",
    email: "fatima@gmail.com",
    phone: "08033334444",
    role: "Customer",
    verificationStatus: "Pending",
    status: "Active",
    joinedAt: "2026-06-05"
  }
];

export const kycApplications = [
  {
    id: 1,
    applicantName: "Amina Bello",
    location: "Abuja",
    status: "pending",
    livenessCheck: "passed",
    idVerification: "passed",
    proofOfAddress: "pending",
    submittedAt: "2 hours ago"
  },
  {
    id: 2,
    applicantName: "John Eze",
    location: "Lagos",
    status: "pending",
    livenessCheck: "passed",
    idVerification: "pending",
    proofOfAddress: "pending",
    submittedAt: "3 hours ago"
  },
  {
    id: 3,
    applicantName: "Grace Okon",
    location: "Uyo",
    status: "approved",
    livenessCheck: "passed",
    idVerification: "passed",
    proofOfAddress: "passed",
    submittedAt: "1 day ago"
  },
  {
    id: 4,
    applicantName: "David Yusuf",
    location: "Kaduna",
    status: "rejected",
    livenessCheck: "failed",
    idVerification: "pending",
    proofOfAddress: "pending",
    submittedAt: "2 days ago"
  },
  {
    id: 5,
    applicantName: "Ifeanyi Obi",
    location: "Enugu",
    status: "pending",
    livenessCheck: "passed",
    idVerification: "passed",
    proofOfAddress: "pending",
    submittedAt: "5 hours ago"
  },
  {
    id: 6,
    applicantName: "Fatima Lawal",
    location: "Kano",
    status: "pending",
    livenessCheck: "passed",
    idVerification: "passed",
    proofOfAddress: "pending",
    submittedAt: "6 hours ago"
  }
];
export const orders = [
  {
    id: "VLR-1001",
    property: "Luxury Duplex",
    customer: "Chinedu Okafor",
    agent: "Prime Homes",
    amount: "₦8,500,000",
    status: "Completed",
    createdAt: "2026-06-15",
    reservationEnds: "-",
  },

  {
    id: "VLR-1002",
    property: "2 Bedroom Flat",
    customer: "Amina Bello",
    agent: "Urban Properties",
    amount: "₦2,100,000",
    status: "Pending",
    createdAt: "2026-06-17",
    reservationEnds: "2026-06-20",
  },

  {
    id: "VLR-1003",
    property: "Mini Flat",
    customer: "John Eze",
    agent: "Kings Realtors",
    amount: "₦1,250,000",
    status: "Pending",
    createdAt: "2026-06-16",
    reservationEnds: "2026-06-19",
  },

  {
    id: "VLR-1004",
    property: "4 Bedroom Detached",
    customer: "Emeka Obi",
    agent: "Prime Homes",
    amount: "₦12,000,000",
    status: "Cancelled",
    createdAt: "2026-06-10",
    reservationEnds: "-",
  }
];
export const flaggedItems = [
  {
    id: 1,
    type: "message",
    reason: "phone_number",
  },
];

export const listings = [
  {
    id: "LST001",
    title: "3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    agent: "Chinedu Okafor",
    price: 3500000,
    status: "Active",
    category: "Apartment",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    id: "LST002",
    title: "2 Bedroom Flat",
    location: "Gwarinpa, Abuja",
    agent: "Amina Bello",
    price: 2200000,
    status: "Pending",
    category: "Flat",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    id: "LST003",
    title: "Luxury Duplex",
    location: "Ikoyi, Lagos",
    agent: "Emeka Obi",
    price: 12000000,
    status: "Rejected",
    category: "Duplex",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  }
];
export const payments = [
  {
    id: "PAY-1001",
    orderId: "VLR-1001",
    customer: "Chinedu Okafor",
    agent: "Prime Homes",
    amount: "₦8,500,000",
    gateway: "Paystack",
    status: "Successful",
    date: "2026-06-15",
  },

  {
    id: "PAY-1002",
    orderId: "VLR-1002",
    customer: "Amina Bello",
    agent: "Urban Properties",
    amount: "₦2,100,000",
    gateway: "Flutterwave",
    status: "Pending",
    date: "2026-06-17",
  },

  {
    id: "PAY-1003",
    orderId: "VLR-1003",
    customer: "John Eze",
    agent: "Kings Realtors",
    amount: "₦1,250,000",
    gateway: "Paystack",
    status: "Failed",
    date: "2026-06-16",
  },

  {
    id: "PAY-1004",
    orderId: "VLR-1004",
    customer: "Fatima Bello",
    agent: "Prime Homes",
    amount: "₦12,000,000",
    gateway: "Flutterwave",
    status: "Refunded",
    date: "2026-06-14",
  },
];
export const moderationQueue = [
  {
    id: 1,
    type: "Listing",
    target: "Luxury Duplex in Ikoyi",
    reason: "Fraudulent Pricing",
    reports: 4,
    status: "Pending"
  },
  {
    id: 2,
    type: "Message",
    target: "WhatsApp Contact Spam",
    reason: "Phone Number Sharing",
    reports: 2,
    status: "Pending"
  },
  {
    id: 3,
    type: "Listing",
    target: "2 Bedroom Flat",
    reason: "Misleading Photos",
    reports: 6,
    status: "Under Review"
  }
];
export const requests = [
  {
    id: "REQ-1001",
    user: "Amina Bello",
    location: "Lekki",
    budget: "₦3,000,000",
    bedrooms: "2 Bedroom",
    status: "Open",
    createdAt: "2026-06-17",
  },

  {
    id: "REQ-1002",
    user: "Chinedu Okafor",
    location: "Ikoyi",
    budget: "₦8,000,000",
    bedrooms: "4 Bedroom",
    status: "Matched",
    createdAt: "2026-06-16",
  },

  {
    id: "REQ-1003",
    user: "John Eze",
    location: "Yaba",
    budget: "₦1,500,000",
    bedrooms: "1 Bedroom",
    status: "Closed",
    createdAt: "2026-06-15",
  },

  {
    id: "REQ-1004",
    user: "Fatima Bello",
    location: "Ajah",
    budget: "₦2,500,000",
    bedrooms: "2 Bedroom",
    status: "Open",
    createdAt: "2026-06-18",
  }
];
export const recentActivities = [
  {
    id: 1,
    action: "New KYC submitted",
    user: "Amina Bello",
    time: "5 mins ago",
  },

  {
    id: 2,
    action: "Order completed",
    user: "Chinedu Okafor",
    time: "20 mins ago",
  },

  {
    id: 3,
    action: "Listing approved",
    user: "Prime Homes",
    time: "1 hour ago",
  },

  {
    id: 4,
    action: "Payment received",
    user: "John Eze",
    time: "2 hours ago",
  },
];