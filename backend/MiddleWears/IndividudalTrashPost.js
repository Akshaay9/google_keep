import Trash from "../Models/TrashModel.js";
import Post from "../Models/PostModel.js";
export const getIndividualTrash = async (req, res, next, id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ error: "invalid Post id" });
    }
    const individualPost = await Trash.findById(id);
    if (!individualPost) {
      res.status(400).json({ error: "post not found" });
    }
    req.individualPost = individualPost;
    next();
  } catch (error) {
    console.log(error);
  }
};
