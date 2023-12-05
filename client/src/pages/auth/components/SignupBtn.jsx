const SignupBtn = () => {
  return (
    <button
      type="submit"
      className="me-2 flex w-auto items-center justify-center whitespace-nowrap rounded-full border border-slate-300 px-5 py-1.5 text-sm font-medium leading-6 text-slate-900 shadow-sm hover:bg-slate-200 hover:bg-opacity-30 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
    >
      Sign up
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        id="user-plus"
        className="ml-2 h-4"
      >
        <line
          x1="176"
          x2="224"
          y1="56"
          y2="56"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="19"
        ></line>
        <line
          x1="200"
          x2="200"
          y1="32"
          y2="80"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="19"
        ></line>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="19"
          d="M30.989 215.99064a112.03731 112.03731 0 0 1 194.02311.002M188.05124 118.18275a63.96647 63.96647 0 1 1-45.27249-84.46794"
        ></path>
      </svg>
    </button>
  );
};

export default SignupBtn;
