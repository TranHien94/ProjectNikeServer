import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findByCategory: async function (category_id) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    category_id: category_id
                }
            });
            return {
                message: "Get products success!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    findAll: async () => {
        try {
            let categories = await prisma.categories.findMany()
            return {
                status: true,
                message: "get all category thanh cong",
                data: categories
            }
        } catch (err) {
            console.log("err", err);
            return {
                status: false,
                message: "get all category that bai"
            }
        }
    },
    createCategory: async (categoryData) => {
        try {
            const newCategory = await prisma.categories.create({
                data: categoryData,
            });
            return {
                status: true,
                message: "Thêm danh mục thành công!",
                data: newCategory,
            };
        } catch (err) {
            console.error(err);
            return {
                status: false,
                message: "Lỗi khi thêm danh mục!",
            };
        }
    },
    deleteCategory: async (categoryId) => {
        try {
            await prisma.categories.delete({
                where: {
                    id: categoryId,
                },
            });
        } catch (err) {
            throw err;
        }
    },
    updateCategory: async (categoryId, categoryData) => {
        try {
            const updatedCategory = await prisma.categories.update({
                where: { id: categoryId },
                data: categoryData,
            });

            return {
                status: true,
                message: "Cập nhật danh mục thành công",
                data: updatedCategory,
            };
        } catch (err) {
            console.error(err);
            return {
                status: false,
                message: "Lỗi khi cập nhật danh mục!",
            };
        }
    },
}