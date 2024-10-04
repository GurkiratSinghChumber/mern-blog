// Firebase and other imports
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import app from "../firebase.js";

// Edit component
export default function Edit() {
  // State management
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [updateError, setUpdateError] = useState("");

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch post data based on postId
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/post/getposts?postId=${postId}`);
      const data = await res.json();
      if (!res.ok) {
        setUpdateError(data.message);
        return;
      }
      if (res.ok) {
        setUpdateError(null);
        setFormData((prev) => {
          return { ...prev, ...data.posts[0] };
        });
      }
    } catch (error) {
      setUpdateError(error.message);
    }
  };

  // Handle image upload to Firebase storage
  const handleUploadImage = async () => {
    formData.image = null;
    try {
      if (!file) {
        setImageUploadError("please Select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (e) {
      setImageUploadProgress(null);
      setImageUploadError("Image upload Error");
    }
  };

  // Handle form submission to update post
  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `/api/post/updatePost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setUpdateError(data.message);
      }
      setUpdateError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setUpdateError({ error: error.message });
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className=" text-center text-3xl my-7 font-semibold ">
        Update a Post
      </h1>

      <div className="flex gap-4 sm:flex-row justify-between">
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
          value={formData.title || ""}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        <Select
          value={formData.category || ""}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="uncategorized">Select a category</option>
          <option value="javascript">JavaScript</option>
          <option value="reactjs">React Js</option>
          <option value="nextjs">Next Js</option>
        </Select>
      </div>

      <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 my-2">
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          size="sm"
          outline
          onClick={handleUploadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div>
              <CircularProgressbar
                className="w-16 h-16"
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          ) : (
            "Upload Image"
          )}
        </Button>
      </div>

      {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
      {formData.image && (
        <img
          src={formData.image}
          alt="upload"
          className=" w-full h-52 rounded-sm object-contain object-left"
        />
      )}

      <ReactQuill
        theme="snow"
        placeholder="Write Something...."
        value={formData.content || ""}
        onChange={(value) => {
          setFormData({ ...formData, content: value });
        }}
        className="h-72 mb-12"
        required
      />

      <Button onClick={handleSubmit} gradientDuoTone="purpleToPink">
        Update
      </Button>
      {updateError && (
        <Alert color="failure" className="mt-5">
          {updateError}
        </Alert>
      )}
    </div>
  );
}
