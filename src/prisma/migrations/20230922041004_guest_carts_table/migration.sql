-- AlterTable
ALTER TABLE `cart_details` ADD COLUMN `guest_cart_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `guest_carts` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_details` ADD CONSTRAINT `cart_details_guest_cart_id_fkey` FOREIGN KEY (`guest_cart_id`) REFERENCES `guest_carts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
