const SigninBtn = () => {
  return (
    <button
      type="submit"
      className="me-2 flex w-auto items-center justify-center whitespace-nowrap rounded-full border border-slate-300 px-5 py-1.5 text-sm font-medium leading-6 text-slate-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      Sign in
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        id="sign-in"
        className="ml-1 h-5"
      >
        <polyline
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
          points="94.011 170 136 128 94.011 86"
        ></polyline>
        <line
          x1="24"
          x2="135.971"
          y1="128"
          y2="128"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
          d="M136,40h56a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H136"
        ></path>
      </svg>
    </button>
  );
};

export default SigninBtn;
