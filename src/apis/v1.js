import express from 'express'
import productModule from './modules/product';
import userModule from './modules/user'
import categoryModule from './modules/category';
//import categoryModule from './modules/cart';

const router = express.Router()

router.use('/users', userModule)
router.use('/products', productModule);
router.use('/categories', categoryModule);
//router.use('/cart', categoryModule)

export default router
