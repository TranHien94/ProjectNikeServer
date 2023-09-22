import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default {
    findCart: async function (user_id) {
        try {
            let userCart = await prisma.carts.findUnique({
                where: {
                    user_id
                },
                include: {
                    // cart_details: true,
                    cart_details: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "Lay gio hang thanh cong!",
                data: userCart ? userCart : null
            }

        } catch (err) {
            console.log("err.purchase", err);
            return {
                status: false,
                message: "Lay gio hang that bai!"
            }
        }
    },
    deleteProductFromCart: async function (product_id) {
        try {
            await prisma.cart_details.delete({
                where: {
                    id: product_id
                },
            });
            return {
                status: true,
                message: "Delete product successfully"
            }
        } catch (err) {
            return {
                status: false,
                message: "Delete product fail"
            }
        }

    },
    updateCart: async function (data) {
        //0 delete , 1 increase,2 decrease
        try {

            if (data.type) {
                await prisma.cart_details.update({
                    where: {
                        id: data.cart_detail_record_edited.id
                    },
                    data: {
                        quantity: data.cart_detail_record_edited.quantity
                    }
                })
            } else {
                await prisma.cart_details.delete({
                    where: {
                        id: data.cart_detail_record_edited.id
                    }
                })
            }
            return {
                status: true,
                message: 'Updated Successfully'
            }
        } catch (err) {
            console.log("err update", err);
            return {
                status: false,
                message: "Update Cart failed"
            }
        }
    },
    createReceipt: async function (data) {
        try {
            let receipt = prisma.receipts.create({
                data: {
                    ...data.receiptInfor,
                    receipt_details: {
                        create: data.receiptDetails
                    },
                }
            })

            const deleteCartDetail = prisma.cart_details.deleteMany({
                where: {
                    cart_id: data.receiptInfor.receipt_code
                }
            })

            const deleteCart = prisma.carts.delete({
                where: {
                    id: data.receiptInfor.receipt_code,
                },
            })

            const transaction = await prisma.$transaction([receipt, deleteCartDetail, deleteCart])

            return {
                status: true,
                message: "Ok nhé",
                data: receipt
            }
        } catch (err) {
            console.log("lỗi createReceipt", err)
            return {
                status: false,
                message: "lỗi createReceipt model"
            }
        }
    },
    addToCart: async function (user_id, cart_detail_record) {
        try {
            /*
                case
                - Người ta chưa từng mua hàng => cart chưa từng có!
                - " "   ""  đã từng mua       => cart đã có => sản phẩm chưa từng có, sản phẩm đã có
            */

            let existCart = await prisma.carts.findUnique({
                where: {
                    user_id: user_id
                }
            })

            if (existCart) {
                /* Đã có cart */
                let existProductInCart = await prisma.cart_details.findMany({
                    where: {
                        AND: [
                            {
                                product_id: cart_detail_record.product_id
                            },
                            {
                                cart_id: existCart.id
                            }
                        ]
                    }
                })

                if (existProductInCart.length != 0) {
                    /* sản phẩm đã tồn tại */
                    await prisma.cart_details.update({
                        where: {
                            id: existProductInCart[0].id
                        },
                        data: {
                            quantity: (existProductInCart[0].quantity + cart_detail_record.quantity),
                            // note: (existProductInCart[0].note + "," + cart_detail_record.note)
                        }
                    })

                    return {
                        status: true,
                        message: "Add to cart thành công!"
                    }
                } else {
                    /* sản phẩm chưa tồn tại */
                    await prisma.cart_details.create({
                        data: {
                            cart_id: existCart.id,
                            ...cart_detail_record
                        }
                    })

                    return {
                        status: true,
                        message: "Add to cart thành công!"
                    }
                }
            } else {
                /* Chưa từng mua hàng (chưa có cart) */
                await prisma.carts.create({
                    data: {
                        user_id,
                        cart_details: {
                            create: [
                                cart_detail_record
                            ]
                        },
                    }
                })

                return {
                    status: true,
                    message: "Add to cart thành công!"
                }
            }

        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
}
