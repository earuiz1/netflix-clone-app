import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/SignUpBackground.jpg";
import { auth } from "../../fireabase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginContent = () => {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      reset();
      navigate("..");

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
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
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email or phone number"
              className="p-2 rounded-sm bg-[#333333] text-slate-100 placeholder:text-sm"
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
              className="p-2 rounded-sm bg-[#333333] text-slate-100 placeholder:text-sm"
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
