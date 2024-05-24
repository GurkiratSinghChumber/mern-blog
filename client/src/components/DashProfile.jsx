import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

export default function DashProfile({ handleSignOut }) {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  //handle image upload
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //uploading image to firebase
  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    setImageFileUploadError("");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0)); //toFixed(0) will leave no decimal places
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  //handle change in input fields
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes Made!");
      return;
    }
    try {
      dispatch(updateStart());
      setUpdateUserSuccess(null);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("updated User Successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={filePickerRef}
          className=" hidden"
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  zIndex: 20,
                },
                path: {
                  // Path color
                  stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={` z-10 absolute top-0 bottom-0 rounded-full w-full h-full border-8 border-[lightgray] ${
              imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleInputChange}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="name@gmail.com"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="********"
          onChange={handleInputChange}
        ></TextInput>
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={imageUploadProgress && imageUploadProgress < 100}
        >
          Update
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span
          className="cursor-pointer"
          onClick={() => handleSignOut(dispatch, signOutSuccess)}
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && <Alert color="success"> {updateUserSuccess}</Alert>}
      {updateUserError && <Alert color="failure"> {updateUserError}</Alert>}
      {error && <Alert color="failure"> {error}</Alert>}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the Account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setShowModal(false), handleDeleteUser();
                }}
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
