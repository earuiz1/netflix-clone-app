import SignUpImg from "../../assets/SignUpBackground.jpg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireabase";

const SignUp = () => {
  const onSubmit = async (values) => {
    //console.log(values);

    //TODO - Create user
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    /* Getting the user object from the userCredentials object. */
    const user = userCredentials.user;

    console.log(user);

    //Reset user inputs
    reset();
  };
  /* React Hook Form */
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <section className="w-full h-screen md:h-full relative">
      <div className="bg-slate-950/50 absolute z-[90] w-full h-full"></div>
      <div className="absolute min-w-[90%] md:min-w-[70%] lg:min-w-[50%] bg-slate-950/70 rounded-sm items-center top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] gap-4 z-[91] p-6">
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
            <label
              htmlFor="email"
              className="text-slate-100 font-medium text-sm"
            >
              Please enter your email:
            </label>
            <input
              type="email"
              className="py-2 rounded-sm"
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
            <label
              htmlFor="password"
              className="text-slate-100 font-medium text-sm"
            >
              Please enter your password:
            </label>
            <input
              type="password"
              className="py-2 rounded-sm"
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
          <div className="flex gap-2">
            <input type="checkbox" className="checked:bg-blue-500" />
            <span className="text-slate-100 text-sm">Remember Me</span>
          </div>
          <Link to="../login">
            <span className="text-slate-100 text-sm hover:underline">
              Already subscribed to Netflix? Sign In
            </span>
          </Link>
        </form>
      </div>
      <img
        src={SignUpImg}
        alt="SignUp-Image"
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default SignUp;
