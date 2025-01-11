import { Request, Response } from "express";
import userModel from "../models/userModel";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userModel.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUserPassword = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const newUserPassword = req.body;

  try {
    const newUser = await userModel.findOneAndUpdate(
      { _id: userId },
      newUserPassword,
      { new: true }
    );

    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUserEmail = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const newUserEmail = req.body;

  try {
    const newUser = await userModel.findOneAndUpdate(
      { _id: userId },
      newUserEmail,
      { new: true }
    );

    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  getAllUsers,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
};
