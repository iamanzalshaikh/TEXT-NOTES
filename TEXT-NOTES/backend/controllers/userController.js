import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("name email _id");
        console.log("🔵 Reached getCurrentUser route");
        console.log("req.userId =", req.userId);
        console.log("✅ Found user:", user);

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }


        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });


    } catch (error) {
        console.log("🔴 Error in getCurrentUser:", error.message);
        return res.status(500).json({ message: `getCurrentUser error: ${error.message}` });
    }
};
