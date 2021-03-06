import Post from "../Models/PostModel.js";
import pkg from "lodash";
import Trash from "../Models/TrashModel.js";
import Archieve from "../Models/ArchieveModel.js";
const { extend } = pkg;

export const trashedPosts = async (req, res) => {
  const allPosts = await Trash.find({ user: req.user.id });
  return res.status(200).json(allPosts);
};

export const deleteTrashPost = async (req, res) => {
  const { individualPost } = req;
  await Trash.findByIdAndDelete(individualPost._id);
  const allPosts = await Trash.find({ user: req.user.id });
  return res.status(200).json(allPosts);
};

export const restoreTrash = async (req, res) => {
  const { individualPost } = req;
  const newPost = {
    title: individualPost?.title,
    description: individualPost?.description,
    color: individualPost?.color,
    label: individualPost?.label,
    user: req.user.id,
    isPinned: false,
  };

  if (individualPost.location == "Post") {
    const savedNewPost = new Post(newPost);
    await savedNewPost.save();
    await Trash.findByIdAndDelete(individualPost._id);
    const allPosts = await Post.find({ user: req.user.id });
    return res.status(200).json({ type: "notes", data: allPosts });
  } else {
    const savedNewPost = new Archieve(newPost);
    await savedNewPost.save();
    await Trash.findByIdAndDelete(individualPost._id);
    const allPosts = await Archieve.find({ user: req.user.id });
    return res.status(200).json({ type: "archieve", data: allPosts });
  }
};
