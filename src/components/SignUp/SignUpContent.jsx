import SignUpImg from "../../assets/SignUpBackground.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../fireabase";
import { setDoc, doc } from "firebase/firestore";

const SignUpContent = () => {
  const navigate = useNavigate();

  /* React Hook Form */
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      //TODO - Create user
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        savedMovies: [],
      });

      //Reset user inputs
      reset();

      //Go to the main page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full h-screen xl:h-full relative">
      <div className="bg-slate-950/50 absolute z-[90] w-full h-full"></div>
      <div className="absolute min-w-[90%] md:min-w-[70%] lg:min-w-[50%] bg-slate-950/70 rounded-sm top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[91] p-8">
        <div className="flex flex-col items-center text-center w-full mb-8 gap-4">
          <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-slate-100">
            Unlimited movies, TV shows, and more
          </h3>
          <span className="text-slate-100 font-semibold text-sm">
            Watch anywhere. Cancel anytime.
          </span>
        </div>
        <form
          className="flex flex-col w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className="rounded-sm bg-[#333333] text-slate-100 p-2 placeholder:text-sm"
              {...register("email", {
                required: "This field is required!",
              })}
            />
            {errors.email && (
              <p className="text-red-500 font-bold text-sm underline">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Password"
              className="rounded-sm bg-[#333333] text-slate-100 p-2 placeholder:text-sm"
              {...register("password", {
                required: "This field is required!",
              })}
            />
            {errors.password && (
              <p className="text-red-500 font-bold text-sm underline">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className="bg-[#DC3B30] text-slate-100 text-sm font-bold py-3 mt-2">
            Create Account
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <input type="checkbox" className="checked:bg-blue-500" />
            <span className="text-slate-100 text-sm">Remember Me</span>
          </div>
          <span className="text-slate-100 text-sm hover:underline">
            Need Help
          </span>
        </div>
        <div className="mt-6">
          <Link to="../login">
            <span className="text-slate-100 text-sm hover:underline">
              Already a Netflix memeber, Login here.
            </span>
          </Link>
        </div>
      </div>
      <img
        src={SignUpImg}
        alt="SignUp-Image"
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default SignUpContent;
