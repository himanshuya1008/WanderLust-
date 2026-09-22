import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  cancelBooking, 
  createRazorpayOrder, 
  verifyRazorpayPayment,
  getMerchantBankConfig,
  updateMerchantBankConfig
} from '../controllers/bookingsController.js';

const bookingsRouter = express.Router();

bookingsRouter.get('/my-trips', getUserBookings);
bookingsRouter.post('/create', createBooking);
bookingsRouter.post('/razorpay-order', createRazorpayOrder);
bookingsRouter.post('/razorpay-verify', verifyRazorpayPayment);
bookingsRouter.get('/bank-config', getMerchantBankConfig);
bookingsRouter.post('/bank-config', updateMerchantBankConfig);
bookingsRouter.post('/:id/cancel', cancelBooking);

export default bookingsRouter;


