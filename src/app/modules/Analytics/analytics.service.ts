import { Order } from "../Order/order.model";
import { Product } from "../Product/product.model";
import { User } from "../User/user.model";

const getStats = async () => {
    const totalOrders = await Order.countDocuments();


    const totalSales = await Order.aggregate([
        { $match: { status: "delivered" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);


    const totalUsers = await User.countDocuments({ isDeleted: false });


    const totalProducts = await Product.countDocuments({ isDeleted: false });

    return {
        totalOrders,
        totalSales: totalSales[0]?.total || 0,
        totalUsers,
        totalProducts,
    };
};

export const AnalyticsServices = {
    getStats,
};
