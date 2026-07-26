import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  createChat,
  getChats,
  getChatById,
  addMessage,
  deleteChat,
} from "../controllers/chatHistoryController.js";

const chatHistoryRouter = express.Router();

chatHistoryRouter.post("/", authUser, createChat);
chatHistoryRouter.get("/", authUser, getChats);
chatHistoryRouter.get("/:id", authUser, getChatById);
chatHistoryRouter.post("/:id/message", authUser, addMessage);
chatHistoryRouter.delete("/:id", authUser, deleteChat);

export default chatHistoryRouter;