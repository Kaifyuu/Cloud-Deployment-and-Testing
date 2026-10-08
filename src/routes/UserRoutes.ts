// UserRoutes.ts - Express router for User endpoints
// Part 3 Lab: REST API routing

import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController";

export const userRoutes = Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
