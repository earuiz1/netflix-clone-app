import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/index";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useAuth from "../custom-hooks/useAuth";
import { db } from "../fireabase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const Movie = ({
  id,
  title,
  backDropPath,
  overview,
  language,
  releaseDate,
  genresIDs,
}) => {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const openModalHandler = () => {
    dispatch(
      modalActions.openModal({
        id,
        title,
        backDropPath,
        overview,
        language,
        releaseDate,
        genresIDs,
      })
    );
  };

  const addToFavorites = async () => {
    if (!currentUser?.uid) {
      alert("You must be logged in to add to favorites");
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
          const updatedArray = [...existingArray, { id, title, backDropPath }];

          // Update the document in Firestore with the modified array
          await updateDoc(ref, {
            savedMovies: updatedArray,
          });

          console.log("Array updated successfully");
        } else {
          console.log("ID already exists in the array, no update necessary");
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
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
        src={`https://image.tmdb.org/t/p/w500/${backDropPath}`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Movie;
