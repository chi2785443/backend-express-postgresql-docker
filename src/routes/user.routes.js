import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getAllUsersById,
  updateUser,
} from "../controllers/user.controller.js";
import validateUser from "../middlewares/inputValidator.js";

const useRouter = express.Router();

useRouter.post("/user", validateUser, createUser);
useRouter.get("/user", getAllUsers);
useRouter.get("/user/:id", getAllUsersById);
useRouter.put("/user/:id", validateUser, updateUser);
useRouter.delete("/user/:id", deleteUser);

export default useRouter;
