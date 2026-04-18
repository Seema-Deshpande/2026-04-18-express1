import Thread from '../models/Thread.js';

export const getAllThreads = async () => {
  try {
    return await Thread.find().populate('author', 'username').populate('subreddit', 'name');
  } catch (error) {
    throw new Error(`Error fetching threads: ${error.message}`);
  }
};

export const getThreadById = async (id) => {
  try {
    return await Thread.findById(id).populate('author', 'username').populate('subreddit', 'name');
  } catch (error) {
    throw new Error(`Error fetching thread by ID: ${error.message}`);
  }
};

export const createThread = async (threadData) => {
  try {
    // Check if a thread with the same title already exists in the same subreddit
    const existingThread = await Thread.findOne({ 
      title: threadData.title, 
      subreddit: threadData.subreddit 
    });
    
    if (existingThread) {
      return null; // or throw a specific error
    }

    const thread = new Thread(threadData);
    return await thread.save();
  } catch (error) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
};

export const updateThread = async (id, threadData) => {
  try {
    const thread = await Thread.findById(id);
    if (!thread) {
      return null;
    }

    const updatedThread = await Thread.findByIdAndUpdate(id, threadData, { new: true, runValidators: true })
      .populate('author', 'username')
      .populate('subreddit', 'name');
    return updatedThread;
  } catch (error) {
    throw new Error(`Error updating thread: ${error.message}`);
  }
};

export const deleteThread = async (id) => {
  try {
    const thread = await Thread.findById(id);
    if (!thread) {
      return null;
    }
    return await Thread.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting thread: ${error.message}`);
  }
};
