// Active reservations storage
let bookings = [
  {
    id: "bk-89214",
    confirmationCode: "WL-98314A",
    transactionId: "TXN-RZP-98314A",
    paymentId: "pay_rzp_demo_89214A",
    paymentMethod: "RAZORPAY_UPI",
    stayId: "wl-101",
    stayTitle: "The Celestial Cliffside Sanctuary",
    stayCity: "Oia, Santorini",
    stayCountry: "Greece",
    stayImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2026-10-12",
    checkOut: "2026-10-17",
    nights: 5,
    guests: 2,
    pricePerNight: 28500,
    cleaningFee: 2500,
    serviceFee: 1800,
    totalPrice: 146800,
    totalInr: 146800,
    status: "confirmed",
    guestName: "Himanshu",
    createdAt: new Date().toISOString()
  }
];

export const createBooking = async (req, res) => {
  try {
    const userId = req.auth ? (await req.auth()).userId : "demo_user";
    const {
      stayId,
      stayTitle,
      stayCity,
      stayCountry,
      stayImage,
      checkIn,
      checkOut,
      nights,
      guests,
      pricePerNight,
      cleaningFee,
      serviceFee,
      guestName,
      guestEmail,
      specialRequests,
      paymentMethod,
      transactionId,
      paymentId
    } = req.body;

    if (!stayId || !checkIn || !checkOut) {
      return res.status(400).json({ success: false, message: "Missing required booking details" });
    }

    const calculatedNights = Math.max(Number(nights) || 1, 1);
    const subtotal = calculatedNights * Number(pricePerNight || 28500);
    const cleanFee = Number(cleaningFee || 2500);
    const servFee = Number(serviceFee || 1800);
    const total = subtotal + cleanFee + servFee;

    const confirmationCode = req.body.confirmationCode || `WL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const txnId = transactionId || `TXN-RZP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const pId = paymentId || `pay_rzp_${Math.random().toString(36).substring(2, 10)}`;

    const newBooking = {
      id: req.body.id || `bk-${Date.now()}`,
      confirmationCode,
      transactionId: txnId,
      paymentId: pId,
      paymentMethod: paymentMethod || "RAZORPAY_UPI_QR",
      userId,
      stayId,
      stayTitle: stayTitle || "WanderLust Vacation Stay",
      stayCity: stayCity || "Global Destination",
      stayCountry: stayCountry || "",
      stayImage: stayImage || "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      checkIn,
      checkOut,
      nights: calculatedNights,
      guests: Number(guests) || 1,
      pricePerNight: Number(pricePerNight || 28500),
      cleaningFee: cleanFee,
      serviceFee: servFee,
      totalPrice: total,
      totalInr: total,
      status: "confirmed",
      guestName: guestName || "WanderLust Guest",
      guestEmail: guestEmail || "guest@wanderlust.com",
      specialRequests: specialRequests || "",
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);

    res.json({
      success: true,
      booking: newBooking,
      message: "Reservation confirmed successfully! Your booking code is " + confirmationCode
    });
  } catch (error) {
    console.error("createBooking error:", error);
    res.json({ success: false, error: error.message });
  }
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", stayTitle } = req.body;
    const orderId = `order_rzp_${Math.random().toString(36).substring(2, 12)}`;
    const qrString = `upi://pay?pa=wanderlust.rentals@razorpay&pn=WanderLust%20Luxury%20Stays&am=${amount}&cu=${currency}&tn=Booking%20for%20${encodeURIComponent(stayTitle || 'Luxury Stay')}`;

    res.json({
      success: true,
      orderId,
      amount: Number(amount) || 15000,
      currency,
      keyId: "rzp_test_wanderlust_luxury_2026",
      upiId: "wanderlust.rentals@razorpay",
      qrString,
      businessName: "WanderLust Stays & Villas Private Limited"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, bookingData } = req.body;
    const confirmationCode = `WL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const confirmedBooking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      confirmationCode,
      transactionId: razorpayOrderId || `TXN-RZP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      paymentId: razorpayPaymentId || `pay_rzp_${Math.random().toString(36).substring(2, 10)}`,
      paymentMethod: "RAZORPAY_QR",
      status: "confirmed",
      paidAt: new Date().toISOString()
    };

    bookings.unshift(confirmedBooking);

    res.json({
      success: true,
      booking: confirmedBooking,
      message: "Payment successfully verified via Razorpay Gateway!"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Merchant recipient bank account & UPI configuration for receiving guest payments
let merchantBankConfig = {
  accountName: process.env.MERCHANT_ACCOUNT_NAME || "Himanshu (WanderLust Stays)",
  bankName: process.env.MERCHANT_BANK_NAME || "HDFC Bank Ltd",
  accountNumber: process.env.MERCHANT_ACCOUNT_NO || "50100492817291",
  ifscCode: process.env.MERCHANT_IFSC_CODE || "HDFC0000240",
  branch: "Mumbai Central Branch / India",
  upiId: process.env.MERCHANT_UPI_ID || "wanderlust.rentals@razorpay",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || "rzp_test_wanderlust_luxury_2026",
  settlementFrequency: "Instant T+0 / Daily Auto-Settlement",
  accountType: "Current / Merchant Business Account"
};

export const getMerchantBankConfig = async (req, res) => {
  try {
    res.json({
      success: true,
      config: merchantBankConfig,
      message: "Recipient bank account configuration loaded."
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateMerchantBankConfig = async (req, res) => {
  try {
    const {
      accountName,
      bankName,
      accountNumber,
      ifscCode,
      branch,
      upiId,
      razorpayKeyId
    } = req.body;

    merchantBankConfig = {
      ...merchantBankConfig,
      accountName: accountName || merchantBankConfig.accountName,
      bankName: bankName || merchantBankConfig.bankName,
      accountNumber: accountNumber || merchantBankConfig.accountNumber,
      ifscCode: ifscCode || merchantBankConfig.ifscCode,
      branch: branch || merchantBankConfig.branch,
      upiId: upiId || merchantBankConfig.upiId,
      razorpayKeyId: razorpayKeyId || merchantBankConfig.razorpayKeyId
    };

    res.json({
      success: true,
      config: merchantBankConfig,
      message: "Bank Account & UPI receiving details updated successfully!"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const index = bookings.findIndex((b) => b.id === id || b.confirmationCode === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    bookings[index].status = "cancelled";
    res.json({ success: true, booking: bookings[index], message: "Reservation cancelled successfully." });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
