const handleSignOut = async (dispatch, signOutSuccess) => {
  try {
    const res = await fetch("/api/user/sign-out", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      dispatch(signOutSuccess());
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { handleSignOut };
