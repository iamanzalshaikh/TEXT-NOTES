import Note from '../models/noteModel.js';

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    console.log("📝 [createNote] Request received");
    console.log("Title:", title, "Content:", content, "User ID:", req.userId);

    try {
        const note = await Note.create({
            title,
            content,
            user: req.userId,
        });
        console.log("✅ [createNote] Note created:", note);
        res.status(201).json(note);
    } catch (error) {
        console.error("❌ [createNote] Failed:", error.message);
        res.status(500).json({ message: "Failed to create note", error });
    }
};

export const getNotes = async (req, res) => {
    console.log("📥 [getNotes] Request received from User ID:", req.userId);

    try {
        const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
        console.log("✅ [getNotes] Notes found:", notes.length);
        res.status(200).json(notes);
    } catch (error) {
        console.error("❌ [getNotes] Failed:", error.message);
        res.status(500).json({ message: "Failed to get notes", error });
    }
};

export const deleteNote = async (req, res) => {
    console.log("🗑️ [deleteNote] Request to delete note ID:", req.params.id);
    console.log("User ID:", req.userId);

    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });

        if (!note) {

            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        console.log("✅ [deleteNote] Note deleted:", note._id);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("❌ [deleteNote] Failed:", error.message);
        res.status(500).json({ message: "Failed to delete note", error });
    }
};
