const Navbar = () => {
  return (
    <div className="flex absolute w-full justify-between items-center p-4 z-[100]">
      <h1 className="text-red-600 font-bold text-4xl cursor-pointer">
        Netflix
      </h1>
      <div className="flex gap-4">
        <button className="text-slate-50">Sign In</button>
        <button className="text-slate-50 bg-red-600 px-4 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
