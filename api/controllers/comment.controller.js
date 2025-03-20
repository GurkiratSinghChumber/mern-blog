const Comment = require("../modles/comment.model.js");
const { errorHandler } = require("../utils/error.js");
const addComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    const savedComment = await newComment.save();

    res.status(200).json(savedComment);
  } catch (error) {
    return next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};
const addLike = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;
  if (!commentId) {
    return next(errorHandler(404, "Comment not found"));
  }

  if (!userId) {
    return next(errorHandler(403, "You are not allowed to like this comment"));
  }
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return next(errorHandler(404, "Comment not found"));

    const isLiked = comment.likes.includes(userId);

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      isLiked
        ? { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } } // Remove like
        : { $push: { likes: userId }, $inc: { numberOfLikes: 1 } }, // Add like
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};

const editComment = async (req, res, next) => {
  const { content } = req.body;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return next(errorHandler(404, "Comment not found"));
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content,
      },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(400, "comment not found"));
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "comment has been deleted" });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  addComment,
  getComments,
  addLike,
  editComment,
  deleteComment,
};
