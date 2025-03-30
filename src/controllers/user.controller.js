// standardized response function

import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/user.model.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User Created Successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 201, "Users fetched Successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 201, "User fetched Successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await updateUserService(id, name, email);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 201, "User updated Successfully", user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await updateUserService(id);
    if (!deleteUser) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 201, "User deleted Successfully", deleteUser);
  } catch (error) {
    next(error);
  }
};
