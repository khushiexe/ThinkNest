import chatModel from "../models/chatModel.js";

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const chat = await chatModel.create({
      user: req.userId,
      title: req.body.title || "New Chat",
      messages: [],
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all chats of logged-in user
export const getChats = async (req, res) => {
  try {
    const chats = await chatModel
      .find({ user: req.userId })
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single chat
export const getChatById = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add message to chat
export const addMessage = async (req, res) => {
  try {
    const { role, text } = req.body;

    const chat = await chatModel.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.messages.push({
      role,
      text,
    });

    await chat.save();

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete chat
export const deleteChat = async (req, res) => {
  try {
    const chat = await chatModel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};