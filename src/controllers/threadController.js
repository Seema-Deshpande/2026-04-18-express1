import mongoose from 'mongoose';
import * as threadService from '../services/threadService.js';

export const getAllThreads = async (req, res) => {
  try {
    const threads = await threadService.getAllThreads();
    res.status(200).json({
      success: true,
      data: threads
    });
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch threads'
    });
  }
};

export const getThreadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid thread ID format'
      });
    }

    const thread = await threadService.getThreadById(id);
    
    if (!thread) {
      return res.status(404).json({
        success: false,
        message: 'Thread not found'
      });
    }

    res.status(200).json({
      success: true,
      data: thread
    });
  } catch (error) {
    console.error(`Error fetching thread ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the thread'
    });
  }
};

export const createThread = async (req, res) => {
  try {
    const { title, content, author, subreddit } = req.body;

    if (!title || !content || !author || !subreddit) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, content, author, and subreddit are required'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(author) || !mongoose.Types.ObjectId.isValid(subreddit)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid author or subreddit ID format'
      });
    }

    const newThread = await threadService.createThread({ title, content, author, subreddit });
    
    if (!newThread) {
      return res.status(409).json({
        success: false,
        message: 'A thread with this title already exists in this subreddit'
      });
    }

    res.status(201).json({
      success: true,
      data: newThread,
      message: 'Thread created successfully'
    });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the thread'
    });
  }
};

export const updateThread = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid thread ID format'
      });
    }

    const updatedThread = await threadService.updateThread(id, { title, content });

    if (!updatedThread) {
      return res.status(404).json({
        success: false,
        message: 'Thread not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedThread,
      message: 'Thread updated successfully'
    });
  } catch (error) {
    console.error(`Error updating thread ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the thread'
    });
  }
};

export const deleteThread = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid thread ID format'
      });
    }

    const deletedThread = await threadService.deleteThread(id);

    if (!deletedThread) {
      return res.status(404).json({
        success: false,
        message: 'Thread not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Thread deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting thread ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the thread'
    });
  }
};
