import AccountContent from "../components/AccountContent";

const Account = () => {
  return (
    <>
      <div className="w-full h-[400px] bg-gradient-to-br from-slate-900 to-red-500 flex justify-start items-center px-6">
        <h3 className="text-slate-100 font-bold text-4xl">
          My Favorite Movies
        </h3>
      </div>
      <AccountContent />
    </>
  );
};

export default Account;
