import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comments";

import { Alert, Button, Modal, Textarea } from "flowbite-react";
export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      setCommentError("");
      const res = await fetch(`/api/comment/addComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommentError("");
        setComment("");
        setComments((prev) => [data, ...prev]);
      }
    } catch (error) {
      setCommentError(error);
    }
  };

  // getting all the comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  // handling like
  const handleLikeClick = async (comment) => {
    try {
      const res = await fetch(`/api/comment/addLike/${comment._id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment._id === data._id) {
              return {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.numberOfLikes,
              };
            } else {
              return comment;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handling Edit
  const handleEdit = async (comment, editedContent) => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment._id === data._id) {
              return {
                ...comment,
                content: data.content,
              };
            } else {
              return comment;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Delete
  const handleDelete = async (deleteCommentId) => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${deleteCommentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c._id !== deleteCommentId));
      }
      setDeleteCommentId("");
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      setDeleteCommentId("");
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Singed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-2">
          You Must be signed in to Comment.
          <Link className="text-teal-500 hover:underline" to={`/sign-in`}>
            Sing In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="add a comment...."
            rows="3"
            maxLength="200"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          ></Textarea>
          <div className="flex justify-between items-center mt-5 ">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No Comments</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 h-6 w-6 text-center rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLikeClick}
              currentUser={currentUser}
              onEdit={handleEdit}
              setShowModal={setShowModal}
              setDeleteCommentId={setDeleteCommentId}
            ></Comment>
          ))}
        </>
      )}

      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(deleteCommentId)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
