// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { signInWithPopup, auth, provider } from "../utlis/firebase";
// import googleLogo from "../assests/google-logo.png";
// import { UserDataContext } from "../context/UserContext";

// const Registration = () => {
//     const { serverUrl } = useContext(AuthContext);
//     const [form, setForm] = useState({ name: "", dob: "", email: "" });
//     const [otp, setOtp] = useState("");
//     const [otpSent, setOtpSent] = useState(false);
//     const navigate = useNavigate();
//     const { getCurrentUser } = useContext(UserDataContext);


//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleGetOtp = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${serverUrl}/api/otp/send`, form);
//             alert("OTP sent to your email");
//             setOtpSent(true);
//         } catch (err) {
//             console.error("OTP send error:", err.response?.data || err.message);
//             alert("Failed to send OTP");
//         }
//     };

//     const handleVerifyOtp = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${serverUrl}/api/otp/verify`, {
//                 email: form.email,
//                 otp,
//                 dob: form.dob,

//                 name: form.name
//             }, {
//                 withCredentials: true,
//             });
//             alert("OTP verified successfully");
//             await getCurrentUser();
//             navigate("/", { replace: true });

//             console.log(res.data.user);
//         } catch (err) {
//             console.error("OTP verify error:", err.response?.data || err.message);
//             alert("Invalid OTP");
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

//             await getCurrentUser(); // ✅ fetch and update userData from context
//             alert("Google login successful");
//             navigate("/", { replace: true });

//             console.log("✅ Google Login Response: ", res.data);
//         } catch (err) {
//             console.error("Google login error:", err.response?.data || err.message);
//             alert("Google login failed");
//         }
//     };


//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//             <form
//                 className="bg-white p-6 rounded-xl shadow-md w-[350px] space-y-4"
//                 onSubmit={otpSent ? handleVerifyOtp : handleGetOtp}
//             >
//                 <h2 className="text-center text-2xl font-bold">Sign Up</h2>

//                 {/* Input Fields (Always show) */}
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                 />
//                 <input
//                     type="date"
//                     name="dob"
//                     value={form.dob}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                 />

//                 {/* OTP Input (Only show when sent) */}
//                 {otpSent && (
//                     <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="w-full border rounded px-3 py-2"
//                         required
//                     />
//                 )}

//                 {/* Button - Changes based on OTP */}
//                 <button
//                     type="submit"
//                     className={`w-full ${otpSent ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
//                         } text-white rounded py-2`}
//                 >
//                     {otpSent ? "Verify OTP" : "Get OTP"}
//                 </button>

//                 {/* Divider */}
//                 <div className="flex items-center justify-center space-x-2 pt-2">
//                     <div className="border-t w-1/4"></div>
//                     <p className="text-gray-500 text-sm">or</p>
//                     <div className="border-t w-1/4"></div>
//                 </div>

//                 {/* Google Login */}
//                 <button
//                     type="button"
//                     onClick={handleGoogleLogin}
//                     className="w-full flex items-center justify-center space-x-2 border rounded py-2 hover:bg-gray-100"
//                 >
//                     <img src={googleLogo} alt="Google" className="w-5 h-5" />
//                     <span>Continue with Google</span>
//                 </button>

//                 <p className="text-sm text-center">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-blue-500 hover:underline">
//                         Sign in
//                     </Link>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Registration;



import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signInWithPopup, auth, provider } from "../utlis/firebase";
import googleLogo from "../assests/google-logo.png";
import { UserDataContext } from "../context/UserContext";
import newLogo from "../assests/icon (4).png";
const Registration = () => {
    const { serverUrl } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", dob: "", email: "" });
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const { getCurrentUser } = useContext(UserDataContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGetOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverUrl}/api/otp/send`, form);
            alert("OTP sent to your email");
            setOtpSent(true);
        } catch (err) {
            console.error("OTP send error:", err.response?.data || err.message);
            alert("Failed to send OTP");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${serverUrl}/api/otp/verify`, {
                email: form.email,
                otp,
                dob: form.dob,
                name: form.name
            }, {
                withCredentials: true,
            });
            alert("OTP verified successfully");
            await getCurrentUser();
            navigate("/", { replace: true });
            console.log(res.data.user);
        } catch (err) {
            console.error("OTP verify error:", err.response?.data || err.message);
            alert("Invalid OTP");
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

            await getCurrentUser();
            alert("Google login successful");
            navigate("/", { replace: true });
            console.log("✅ Google Login Response: ", res.data);
        } catch (err) {
            console.error("Google login error:", err.response?.data || err.message);
            alert("Google login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
            <form
                onSubmit={otpSent ? handleVerifyOtp : handleGetOtp}
                className="relative border-2 border-blue-500 rounded-[20px] p-8 bg-white w-full max-w-sm shadow-lg space-y-4"
            >
                {/* Top-left: Logo + HD Text */}
                <div className="absolute top-3 left-4 flex items-center space-x-2 text-sm font-bold text-black">
                    <img
                        src={newLogo}
                        alt="Logo"
                        className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                    />
                    <span>HD</span>
                </div>


                <h2 className="text-2xl font-bold mt-8">Sign up</h2>
                <p className="text-gray-400 text-sm -mt-2 mb-4">
                    Sign up to enjoy the feature of HD
                </p>





                <div>
                    <label className="text-sm text-gray-500 mb-1 block">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                {/* DOB */}
                <div>
                    <label className="text-sm text-gray-500 mb-1 block">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>


                <div>
                    <label className="text-sm text-gray-500 mb-1 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email "
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>


                {otpSent && (
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">Enter OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                            required
                        />
                    </div>
                )}


                <button
                    type="submit"
                    className={`w-full ${otpSent ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 rounded-lg`}
                >
                    {otpSent ? "Verify OTP" : "Get OTP"}
                </button>

                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
                >
                    <img src={googleLogo} alt="Google" className="w-5 h-5" />
                    <span>Continue with Google</span>
                </button>

                {/* Sign in Link */}
                <p className="text-sm text-center text-gray-600 mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Registration;
