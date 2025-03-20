import { Button, Spinner, Textarea } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

const Comment = ({
  comment,
  onLike,
  currentUser,
  onEdit,
  setShowModal,
  setDeleteCommentId,
}) => {
  const [user, setUser] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isLoading, setISloading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  // save edited comment

  const handleSave = async () => {
    try {
      setISloading(true);
      await onEdit(comment, editContent);
      setISloading(false);
      setIsEditable(false);
    } catch (error) {
      setIsEditable(false);
      setISloading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 gap-2 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200 object-cover"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymus user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {!isEditable ? (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center gap-2 border-t md:w-[35%] p-1">
              <AiFillLike
                className={`${
                  comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-slate-700 "
                } cursor-pointer w-3 h-3`}
                onClick={() => onLike(comment)}
              />

              <p className=" text-slate-400 text-xs ">
                {comment.numberOfLikes} Like
              </p>
              {comment.userId === currentUser._id && (
                <>
                  <button
                    className=" text-slate-400 text-xs cursor-pointer hover:underline hover:text-blue-500"
                    onClick={() => {
                      setIsEditable(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className=" text-red-400 text-xs cursor-pointer hover:underline"
                    onClick={() => {
                      setShowModal(true);
                      setDeleteCommentId(comment._id);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Textarea
              className="my-2 overflow-scroll"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            ></Textarea>

            <div className="flex gap-2 float-right">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                {isLoading && <Spinner className="mr-1" />}
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => {
                  setIsEditable(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
