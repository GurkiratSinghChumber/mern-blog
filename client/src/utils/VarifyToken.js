import { handleSignOut } from "./SignOutFunction";
export const checkAuth = async (dispatch, signOutSuccess) => {
  const res = await fetch("api/user/test", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    handleSignOut(dispatch, signOutSuccess);
  }
};
