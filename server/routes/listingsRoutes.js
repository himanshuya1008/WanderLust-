import express from 'express';
import { getListings, getListingById, createListing, addReview } from '../controllers/listingsController.js';

const listingsRouter = express.Router();

listingsRouter.get('/', getListings);
listingsRouter.get('/:id', getListingById);
listingsRouter.post('/create', createListing);
listingsRouter.post('/:id/reviews', addReview);

export default listingsRouter;
