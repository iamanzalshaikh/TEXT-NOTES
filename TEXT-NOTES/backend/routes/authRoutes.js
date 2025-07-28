import express from 'express';
import { register, login, logout, googleLogin } from '../controllers/authController.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/register', register); // ❌ No isAuth
router.post('/login', login);       // ❌ No isAuth
router.post('/logout', logout);     // ❌ No isAuth
router.post('/googlelogin', googleLogin); // ❌ No isAuth

// Optional: Add this to test token
router.get('/check-auth', isAuth, (req, res) => {
    res.json({ message: "✅ Authenticated!", userId: req.userId });
});

export default router;
