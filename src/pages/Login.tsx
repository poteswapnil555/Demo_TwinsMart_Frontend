import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase";
import { getUser, useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/apiTypes";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    if (!gender) return toast.error("Please select a gender");
    if (!date) return toast.error("Please select your date of birth");

    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const userPayload = {
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      };

      console.log("Submitting user:", userPayload);

      const res = await login(userPayload);

      if ("data" in res && res.data) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign In Failed");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler} disabled={!gender || !date}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
