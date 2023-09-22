import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findAllProducts: async () => {
        try {
            let products = await prisma.products.findMany()
            return {
                status: true,
                message: "get all product thanh cong",
                data: products
            }
        } catch (err) {
            console.log("err", err);
            return {
                status: false,
                message: "get all product that bai"
            }
        }
    },
    findByCategoryId: async function (category_id) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    category_id: category_id
                }
            });
            return {
                message: "Get products successfully!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    findById: async function (id) {
        try {
            let products = await prisma.products.findUnique({
                where: {
                    id: id
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
    findMany: async function () {
        try {
            let products = await prisma.products.findMany();
            return {
                status: true,
                message: "san pham duoc tim thay!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "lỗi!"
            }
        }
    },
    searchByName: async function (searchString) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchString,
                            }
                        },
                        {
                            des: {
                                contains: searchString,
                            },
                        }
                    ]
                }
            });
            return {
                status: true,
                message: "Ket qua search",
                data: products
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "lỗi!"
            }
        }
    },
    create: async function (newProduct) {
        try {
            const product = await prisma.products.create({
                data: newProduct
            })
            return {
                status: true,
                message: "Thêm sản phẩm thành công!",
                data: product
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    update: async (productId, data) => {
        try {
            let product = await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    ...data
                }
            })

            return {
                status: true,
                message: "Update thành công!",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi gì đó!"
            }
        }
    },
}