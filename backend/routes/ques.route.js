import { Router } from "express";
import { evaluateSelectedOption, getAllQue, getAllQueOptandAns, sendFinalResult, Test } from "../controllers/ques.controller.js";
import { createOrFetchUser } from "../middlewares/getUser.middleware.js";

const router=Router();

router.get('/single',getAllQue)
router.get('/allQue',createOrFetchUser,getAllQueOptandAns)
router.post('/input/:id',createOrFetchUser,evaluateSelectedOption)
router.get('/result',createOrFetchUser,sendFinalResult);
router.get('/test',Test);


export {router as QueRouter}