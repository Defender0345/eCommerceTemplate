import express from 'express';
const router = express.Router();
import {
   addOrderItems,
   getOrderById,
   updateOrderToPaid,
   updateOrderToDelivered,
   getMyOrders,
   getOrders,
   deleteOrder,
   getUserOrders,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/user/:userid').get(protect, isAdmin, getUserOrders);
router
   .route('/:id')
   .get(protect, getOrderById)
   .delete(protect, isAdmin, deleteOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
