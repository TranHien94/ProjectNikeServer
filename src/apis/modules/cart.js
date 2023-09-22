import express from 'express'
const router = express.Router()

import purchaseController from '../../controllers/cart.controller';
import authentication from "../../middlewares/authencation";


router.post('/:user_id', authentication.checkToken, purchaseController.addToCart);
router.get('/:user_id', authentication.checkToken, purchaseController.findCart);
router.delete('/:product_id', purchaseController.deleteProductFromCart);
router.patch('/:user_id', purchaseController.updateCart);


export default router;
