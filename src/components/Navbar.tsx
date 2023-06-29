import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        theme: "dark",
      });
    }
  };
  return (
    <div className="flex absolute w-full justify-between items-center py-4 px-6 z-[100]">
      <Link to="..">
        <h1 className="text-red-600 font-bold text-2xl md:text-3xl lg:text-4xl cursor-pointer">
          Netflix
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        {!currentUser ? (
          <>
            <Link to="/login">
              <button className="text-slate-50 text-sm font-bold px-4 py-2 rounded-md">
                Sign In
              </button>
            </Link>
            <Link to="/signUp">
              <button className="text-slate-50 text-sm bg-red-600 font-bold px-4 py-2 rounded-md">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/account">
              <button className="text-slate-50 text-sm font-bold px-4 py-2 rounded-md">
                Account
              </button>
            </Link>
            <Link to="/">
              <button
                className="text-slate-50 text-sm bg-red-600 font-bold px-4 py-2 rounded-md"
                onClick={signOutHandler}
              >
                Logout
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
