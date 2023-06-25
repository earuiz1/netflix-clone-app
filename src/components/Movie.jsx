import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/index";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useAuth from "../custom-hooks/useAuth";
import { db } from "../fireabase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Movie = ({ movie }) => {
  const [favorite, setFavorite] = useState(false);
  const { id, title, poster_path } = movie;
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(modalActions.openModal(movie));
  };

  const addToFavorites = async () => {
    if (!currentUser?.uid) {
      toast("Sign-in to add to favorites!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        theme: "dark",
      });
      return;
    }

    //Movie Ref
    const ref = doc(db, "users", `${currentUser?.uid}`);

    try {
      // Retrieve the document from Firestore
      const documentSnapshot = await getDoc(ref);

      if (documentSnapshot.exists()) {
        // Document exists, retrieve the array field
        const existingArray = documentSnapshot.data().savedMovies || [];

        // Check if the ID already exists in the array
        const isIdAlreadyPresent = existingArray.some((item) => item.id === id);

        if (!isIdAlreadyPresent) {
          setFavorite(!favorite);

          // If the ID doesn't exist, add it to the array
          const updatedArray = [
            ...existingArray,
            {
              id,
              title,
              poster_path,
            },
          ];

          // Update the document in Firestore with the modified array
          await updateDoc(ref, {
            savedMovies: updatedArray,
          });

          toast.success("Movie added to favorites!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            theme: "dark",
          });
        } else {
          toast.error("Movie already in favorites!", {
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
      } else {
        console.log("Document does not exist");
      }
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
    <div className="relative h-full min-w-[200px]">
      <div className="absolute bg-slate-950 opacity-0 hover:opacity-90 w-full h-full z-[12]">
        <div className="flex flex-col justify-around items-center w-full h-full">
          {!favorite ? (
            <MdFavoriteBorder
              size={25}
              className="fill-slate-100 self-start ml-4 cursor-pointer"
              onClick={addToFavorites}
            />
          ) : (
            <MdFavorite
              size={25}
              className="fill-slate-100 self-start ml-4 cursor-pointer"
            />
          )}

          <BsFillPlayFill
            className="fill-slate-100 cursor-pointer"
            size={50}
            onClick={openModalHandler}
          />
          <h4 className="text-center text-sm font-medium text-slate-100 w-[80%]">
            {title}
          </h4>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Movie;
