const Accounts = () => {
  return (
    <>
      <div className="relative my-5 ml-60 mr-10 h-screen overflow-hidden rounded-3xl border bg-zinc-50">
        <div className=" h-full w-full overflow-auto overflow-x-hidden bg-zinc-50 p-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-full hover:scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 ">
          {/* <div className="absolute right-0 top-0 z-10 h-5 w-full bg-gradient-to-b from-zinc-50 to-transparent"></div> */}
          <h2 className=" text-3xl font-semibold ml-5">Account</h2>
          {/* <div className="absolute bottom-0 right-0 h-10 w-full bg-gradient-to-t from-zinc-50 to-transparent "></div> */}
        </div>
      </div>
    </>
  );
};

export default Accounts;
