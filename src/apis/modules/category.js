import express from 'express';
const router = express.Router();

import categoryController from '../../controllers/category.controller';

router.get("/:category_id", categoryController.findByCategory);
router.get('/', categoryController.findAllCategories);

router.post('/', categoryController.createCategory);
router.delete("/:category_id", categoryController.deleteCategory);
router.put("/:category_id", categoryController.updateCategory);

export default router;