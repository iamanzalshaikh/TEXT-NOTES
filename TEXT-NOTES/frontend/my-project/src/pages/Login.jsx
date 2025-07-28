// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { UserDataContext } from "../context/UserContext";
// import { signInWithPopup, auth, provider } from "../utlis/firebase";
// import googleLogo from "../assests/google-logo.png";
// const Login = () => {
//     const { serverUrl } = useContext(AuthContext);
//     const { setUserData } = useContext(UserDataContext);
//     const [form, setForm] = useState({ email: "", otp: "" });
//     const [isOTPSent, setIsOTPSent] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) =>
//         setForm({ ...form, [e.target.name]: e.target.value });

//     const sendOTP = async () => {
//         if (!form.email) return alert("Please enter email");
//         try {
//             setLoading(true);
//             await axios.post(`${serverUrl}/api/otp/send`, { email: form.email });
//             setIsOTPSent(true);
//             alert("OTP sent to your email");
//         } catch (err) {
//             console.error("OTP Send Error:", err.response?.data || err.message);
//             alert("Failed to send OTP");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             const res = await axios.post(`${serverUrl}/api/otp/verify`, form, {
//                 withCredentials: true,
//             });

//             console.log("User Data:", res.data.user); // ✅ Added console log

//             setUserData(res.data.user);
//             navigate("/", { replace: true }); // After successful login or register

//         } catch (err) {
//             console.error("Login error:", err.response?.data || err.message);
//             alert("Invalid OTP or Email");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGoogleLogin = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const { displayName, email } = result.user;

//             const res = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
//                 name: displayName,
//                 email,
//             }, {
//                 withCredentials: true,
//             });

//             alert("Google login successful");
//             setUserData(res.data.user);  // Important!
//             navigate("/", { replace: true });

//             console.log("✅ Google Login Response: ", res.data);
//         } catch (err) {
//             console.error("Google login error:", err.message);
//             alert("Google login failed");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-[350px] space-y-4">
//                 <h2 className="text-center text-2xl font-bold">Sign In via OTP</h2>

//                 {/* Email Field */}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                 />

//                 {/* Show Send OTP button if OTP is not yet sent */}
//                 {!isOTPSent && (
//                     <button
//                         type="button"
//                         onClick={sendOTP}
//                         className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
//                     >
//                         {loading ? "Sending OTP..." : "Send OTP"}
//                     </button>
//                 )}

//                 {/* Show OTP Field and Submit if OTP is sent */}
//                 {isOTPSent && (
//                     <>
//                         <input
//                             type="text"
//                             name="otp"
//                             placeholder="Enter OTP"
//                             value={form.otp}
//                             onChange={handleChange}
//                             className="w-full border rounded px-3 py-2"
//                             required
//                         />
//                         <button
//                             type="submit"
//                             className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700"
//                         >
//                             {loading ? "Verifying..." : "Verify & Login"}
//                         </button>

//                         {/* Resend OTP */}
//                         <p className="text-sm text-center">
//                             Didn't get OTP?{" "}
//                             <button
//                                 type="button"
//                                 onClick={sendOTP}
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 Resend OTP
//                             </button>
//                         </p>
//                     </>
//                 )}
//                 <button
//                     type="button"
//                     onClick={handleGoogleLogin}
//                     className="w-full flex items-center justify-center space-x-2 border rounded py-2 hover:bg-gray-100"
//                 >
//                     <img src={googleLogo} alt="Google" className="w-5 h-5" />
//                     <span>Continue with Google</span>
//                 </button>

//                 <p className="text-sm text-center">
//                     Need an account?{" "}
//                     <Link to="/Registration" className="text-blue-500 hover:underline">
//                         Create one
//                     </Link>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Login;


import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import { signInWithPopup, auth, provider } from "../utlis/firebase";
import googleLogo from "../assests/google-logo.png";
import newLogo from "../assests/icon (4).png";

const Login = () => {
    const { serverUrl } = useContext(AuthContext);
    const { setUserData } = useContext(UserDataContext);
    const [form, setForm] = useState({ email: "", otp: "" });
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const sendOTP = async () => {
        if (!form.email) return alert("Please enter email");
        try {
            setLoading(true);
            await axios.post(`${serverUrl}/api/otp/send`, { email: form.email });
            setIsOTPSent(true);
            alert("OTP sent to your email");
        } catch (err) {
            console.error("OTP Send Error:", err.response?.data || err.message);
            alert("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${serverUrl}/api/otp/verify`, form, {
                withCredentials: true,
            });

            console.log("User Data:", res.data.user);
            setUserData(res.data.user);
            navigate("/", { replace: true });

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            alert("Invalid OTP or Email");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { displayName, email } = result.user;

            const res = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
                name: displayName,
                email,
            }, {
                withCredentials: true,
            });

            alert("Google login successful");
            setUserData(res.data.user);
            navigate("/", { replace: true });

            console.log("✅ Google Login Response: ", res.data);
        } catch (err) {
            console.error("Google login error:", err.message);
            alert("Google login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm relative">

             
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <img
                        src={newLogo}
                        alt="Logo"
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                    />
                    <span className="text-sm font-bold text-gray-800">HD</span>
                </div>

                <h2 className="text-2xl font-bold mb-1 text-center">Sign in</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Please login to continue to your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {isOTPSent && (
                        <div>
                            <label className="text-sm block mb-1">OTP</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="otp"
                                    value={form.otp}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-500"
                                    placeholder="Enter OTP"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    disabled
                                >
                                    👁️
                                </button>
                            </div>
                        </div>
                    )}

                    {!isOTPSent ? (
                        <button
                            type="button"
                            onClick={sendOTP}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                {loading ? "Verifying..." : "Sign in"}
                            </button>

                            <button
                                type="button"
                                onClick={sendOTP}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Resend OTP
                            </button>
                        </>
                    )}

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" className="accent-blue-600" />
                        <label htmlFor="remember" className="text-sm text-gray-600">Keep me logged in</label>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
                    >
                        <img src={googleLogo} alt="Google" className="w-5 h-5" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-sm text-center">
                        Need an account?{" "}
                        <Link to="/Registration" className="text-blue-500 hover:underline">
                            Create one
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default Login;
