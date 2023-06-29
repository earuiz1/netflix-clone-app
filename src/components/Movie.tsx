import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import useAuth from "../custom-hooks/useAuth";
import { db } from "../firebase";
import { doc, updateDoc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { openModal } from "../redux/modal_slice";
import { useAppDispatch } from "../redux/store";

type MovieProps = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
};

interface FirestoreMovie {
  id: number;
  title: string;
  poster_path: string;
}

const Movie = ({
  id,
  title,
  poster_path,
  backdrop_path,
  release_date,
  overview,
  genre_ids,
}: MovieProps) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(
      openModal({ id, title, backdrop_path, release_date, overview, genre_ids })
    );
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
      const documentSnapshot: DocumentSnapshot = await getDoc(ref);

      if (documentSnapshot.exists()) {
        // Document exists, retrieve the array field
        const existingArray: FirestoreMovie[] =
          documentSnapshot.data().savedMovies || [];

        // Check if the ID already exists in the array
        const isIdAlreadyPresent: boolean = existingArray.some(
          (item) => item.id === id
        );

        if (!isIdAlreadyPresent) {
          setFavorite(!favorite);

          // If the ID doesn't exist, add it to the array
          const updatedArray: FirestoreMovie[] = [
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
