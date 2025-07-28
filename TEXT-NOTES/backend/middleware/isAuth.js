import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log("🔵 Token from cookie =", token);

        if (!token) {
            return res.status(401).json({ message: "No token. Unauthorized user!" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid token. Access denied!" });
        }

        req.userId = verifyToken.id;
        next();

    } catch (error) {
        console.log("🔴 Error in isAuth middleware:", error.message);
        return res.status(500).json({ message: `Auth middleware error: ${error.message}` });
    }
};

export default isAuth;
