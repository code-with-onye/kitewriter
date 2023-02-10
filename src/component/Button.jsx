const Button = (props) => {
  return (
    <button
      className="bg-black w-full py-2 flex items-center rounded-3xl text-gray-200 justify-center text-xs font-semibold uppercase tracking-wide shadow-md shadow-black/60 focus:shadow-sm mt-4"
      onClick={props.onClick}
    >
      {props.children}
      <svg viewBox="0 0 24 24" fill="#fff" width="1rem" height="1rem">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
      </svg>
    </button>
  );
};

export default Button;
