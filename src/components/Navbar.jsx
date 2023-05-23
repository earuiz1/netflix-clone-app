import { Link } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../fireabase";

const Navbar = () => {
  const { currentUser } = useAuth();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Sign-out successful!");
        //navigate("");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  return (
    <div className="flex absolute w-full justify-between items-center py-4 px-6 z-[100]">
      <h1 className="text-red-600 font-bold text-2xl md:text-3xl lg:text-4xl cursor-pointer">
        Netflix
      </h1>
      {!currentUser ? (
        <div className="flex gap-4">
          <Link to="login">
            <button className="text-slate-50 text-sm font-bold px-4 py-2 rounded-md">
              Sign In
            </button>
          </Link>
          <Link to="signUp">
            <button className="text-slate-50 text-sm bg-red-600 font-bold px-4 py-2 rounded-md">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <Link to="..">
          <button
            className="text-slate-50 text-sm bg-red-600 font-bold px-4 py-2 rounded-md"
            onClick={signOutHandler}
          >
            Logout
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
