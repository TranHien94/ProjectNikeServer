import express from 'express';
const router = express.Router();

import multer from "multer";

const imgProductStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        cb(null, `product_${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
})

const productUpload = multer({ storage: imgProductStorage })

import productController from '../../controllers/product.controller';

router.get("/:id", productController.findById);
router.post("/", productUpload.array('imgs'), productController.create);
router.get("/", productController.findAllProducts);
router.get("/:category/:category_id", productController.findByCategoryId);
router.patch("/:productId", productUpload.single('avatar'), productController.update);

export default router;