import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createNote, deleteNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/createnote", isAuth, createNote);
router.post("/getnotes", isAuth, getNotes);
router.delete("/delete/:id", isAuth, deleteNote);

export default router;
