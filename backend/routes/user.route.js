import { Router } from "express";
import { createOrFetchUser } from "../controllers/user.controller.js";

const router=Router();

router.get('/detail',createOrFetchUser);

export {router as userRouter}