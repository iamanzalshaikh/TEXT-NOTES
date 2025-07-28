import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import icon from '../assests/icon (4).png';

const Home = () => {
    const { userData, setUserData } = useContext(UserDataContext); // ✅ Declare first
    console.log("👤 userData in DashboardHeader:", userData); // ✅ Now this works fine


    const { serverUrl } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    console.log("👤 userData in Home:", userData);

    const fetchNotes = async () => {
        try {
            const res = await axios.post(
                `${serverUrl}/api/notes/getnotes`,
                {},
                { withCredentials: true }
            );
            console.log("✅ Notes fetched:", res.data);

            setNotes(res.data);
        } catch (err) {
            console.error("Fetch notes error:", err.message);
        }
    };

    const createNote = async () => {
        if (!title.trim() || !content.trim()) return alert("Please fill out both title and content");
        try {
            const res = await axios.post(
                `${serverUrl}/api/notes/createnote`,
                { title, content },
                { withCredentials: true }
            );
            setNotes([res.data, ...notes]);
            setTitle("");
            setContent("");
        } catch (err) {
            console.error("Create note error:", err.message);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${serverUrl}/api/notes/delete/${id}`, {
                withCredentials: true,
            });
            setNotes(notes.filter((n) => n._id !== id));
        } catch (err) {
            console.error("Delete note error:", err.message);
        }
    };


    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${serverUrl}/api/auth/logout`, {}, {
                withCredentials: true,
            });

            if (res.status === 200) {
                console.log("✅ Logout successful:", res.data.message);
                setUserData(null);
                navigate("/login", { replace: true });

            } else {
                console.error("⚠️ Unexpected logout response:", res);
            }
        } catch (err) {
            console.error("❌ Logout error:", err.message);
            alert("Logout failed. Please try again.");
        }
    };

    useEffect(() => {
        console.log("👀 [Home] userData received:", userData);
        console.log("📦 Current userData:", userData);

    }, [userData]);


    useEffect(() => {
        console.log("🚚 Initial notes fetch useEffect running");

        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-6">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
           
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        {/* <img
                            src={icon}
                            alt="icon"
                            className="w-5 h-5 object-contain"
                        /> */}
                        <img
                            src={icon}
                            alt="icon"
                            className="w-5 h-5 object-contain"
                        />
                        Dashboard
                    </div>
                    <button
                        onClick={logoutHandler}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-4 border">
                    <h2 className="font-semibold text-md">
                        Welcome, {userData?.name?.trim() ? userData.name : "User"}!
                    </h2>
                    <p className="text-sm text-gray-600">Email: xxxxx@xxxx.com</p>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-2 text-sm"
                    />
                    <textarea
                        placeholder="Note content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        className="w-full border px-3 py-2 rounded mb-2 text-sm"
                    />
                    <button
                        onClick={createNote}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm font-medium"
                    >
                        Create Note
                    </button>
                </div>

           
                <h2 className="text-md font-medium mb-2">Notes</h2>
                <div className="space-y-2">
                    {notes.length === 0 && (
                        <p className="text-sm text-gray-500">No notes found. Create one!</p>
                    )}
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white border rounded-lg px-4 py-2 shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-sm">{note.title}</p>
                                    <p className="text-xs text-gray-600">{note.content}</p>
                                </div>
                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="text-gray-600 hover:text-red-500 text-lg"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
