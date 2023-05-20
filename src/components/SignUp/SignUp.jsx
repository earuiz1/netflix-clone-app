import SignUpImg from "../../assets/SignUpBackground.jpg";

const SignUp = () => {
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
        <form className="flex flex-col w-full gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-slate-100 font-medium text-sm"
            >
              Please enter your email:
            </label>
            <input type="email" className="py-2 rounded-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-slate-100 font-medium text-sm"
            >
              Please enter your password:
            </label>
            <input type="password" className="py-2 rounded-sm" />
          </div>
          <button className="bg-[#DC3B30] text-slate-100 font-bold py-2">
            Create Account
          </button>
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
