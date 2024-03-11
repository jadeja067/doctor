import { Router } from "express";
import { adminLogIn, updateAdminDetails, getAllUsers } from "../../controller/index.js";
import { verifyJwt } from "../../middlewares/index.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogIn);
adminRouter.patch("/update", verifyJwt, updateAdminDetails);
adminRouter.patch("/users", verifyJwt, getAllUsers);


export default adminRouter;
