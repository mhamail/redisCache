
import express from "express"
const router = express.Router();

import { create,list } from "../controllers/user";
router.post("/user/create",create)
router.get("/user", list)

export { router as userRoutes };