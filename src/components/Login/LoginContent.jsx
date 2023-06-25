import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/MoviesBackground.jpg";
import { auth } from "../../fireabase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginContent = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      //console.log(values);
      await signInWithEmailAndPassword(auth, email, password);
      //const user = userCredentials.user;

      reset();
      navigate("..");

      //console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full h-screen xl:h-full relative">
      <div className="bg-slate-950/50 absolute z-[90] w-full h-full"></div>
      <div className="absolute min-w-[90%] md:min-w-[70%] lg:min-w-[50%] bg-slate-950/70 rounded-sm top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[91] p-10">
        <div className="flex flex-col items-center text-center w-full mb-8">
          <h3 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-slate-100">
            Sign In
          </h3>
        </div>
        <form
          className="flex flex-col w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="floating-input relative">
            <input
              type="email"
              id="email"
              className={`bg-[#323233] focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-[55px] text-sm text-slate-100 ${
                errors.email && "border-b-2 border-[#e87c03]"
              }`}
              placeholder=" Email address"
              autoComplete="off"
              {...register("email", {
                required: "Please enter a valid email",
              })}
            />
            {errors.email && (
              <p className="text-[#e87c03] font-medium text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            <label
              htmlFor="email"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out text-sm text-gray-400"
            >
              Email address
            </label>
          </div>
          <div className="floating-input relative">
            <input
              type="password"
              id="password"
              className={`bg-[#323233] focus:outline-none rounded-md focus:shadow-sm w-full p-3 h-[55px] text-sm text-slate-100 ${
                errors.password && "border-b-2 border-[#e87c03]"
              }`}
              placeholder="password"
              autoComplete="off"
              {...register("password", {
                required: "Please enter a valid password",
              })}
            />
            {errors.password && (
              <p className="text-[#e87c03] font-medium text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <label
              htmlFor="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out text-sm text-gray-400"
            >
              Password
            </label>
          </div>
          <button className="bg-[#DC3B30] text-slate-100 text-sm font-bold py-3 mt-2">
            Sign In
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
          <Link to="../signUp">
            <span className="text-slate-100 text-sm hover:underline">
              New to Netflix? Sign up now.
            </span>
          </Link>
        </div>
      </div>
      <img
        src={LoginImg}
        alt="Login-Image"
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default LoginContent;
