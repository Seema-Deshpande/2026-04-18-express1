import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

export const fetchAllSubreddits = async () => {
  const subreddits = await Subreddit.find()
  return subreddits;
};

export const createNewSubreddit = async (name, description, author) => {
  const existingSubreddit = await Subreddit.findOne({ name });
  if (existingSubreddit) {
    return 
  }
  const data = { name, description, author };
  const subreddits = await Subreddit.create(data);
  return subreddits;
};

export const fetchSubredditWithThreads = async (id) => {
  const subreddits = await Subreddit.findById(id)
  if(!subreddits) {
    return;
  }
  const threads = await Thread
  .find({ subreddit: id })
  .populate('author', 'username');
  return { subreddits, threads };
};
