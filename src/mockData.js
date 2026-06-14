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
    id: "VLR001",
    amount: 850000,
    status: "completed",
  },
  {
    id: "VLR002",
    amount: 1200000,
    status: "pending",
  },
];

export const flaggedItems = [
  {
    id: 1,
    type: "message",
    reason: "phone_number",
  },
];

export const listings = [];
export const payments = [];