
import express from "express"
const router = express.Router();
import { clearCache } from "../middleware/clearCache";
import { create,list,list2 } from "../controllers/user";
router.post("/user/create",clearCache("123"),create)
router.get("/user", list)
router.get("/user2", list2)

export { router as userRoutes };