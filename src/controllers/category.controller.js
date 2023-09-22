import categoryModel from '../models/category.model';

export default {
    findByCategory: async function (req, res) {
        try {
            let result = await categoryModel.findByCategory(parseInt(req.params.category_id));

            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    findAllCategories: async (req, res) => {
        try {
            let modelRes = await categoryModel.findAll()

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    createCategory: async (req, res) => {
        try {
            const categoryData = req.body;

            const result = await categoryModel.createCategory(categoryData);

            if (result.status) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Lỗi không xác định!",
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const categoryId = parseInt(req.params.category_id);
            // check
            const existingCategory = await categoryModel.findByCategory(categoryId);

            if (!existingCategory.data) {
                return res.status(404).json({
                    message: "Danh mục không tồn tại",
                });
            }
            // xoa
            await categoryModel.deleteCategory(categoryId);

            // xoa ok
            return res.status(204).json({
                message: "Xóa danh mục thành công",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Lỗi không xác định!",
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const categoryId = parseInt(req.params.category_id);
            const categoryData = req.body; // Dữ liệu mới cho danh mục

            // check
            const existingCategory = await categoryModel.findByCategory(categoryId);

            if (!existingCategory.data) {
                return res.status(404).json({
                    message: "Danh mục không tồn tại",
                });
            }

            // Thực hiện cập nhật danh mục
            await categoryModel.updateCategory(categoryId, categoryData);

            return res.status(200).json({
                message: "Cập nhật danh mục thành công",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Lỗi không xác định!",
            });
        }
    },
}