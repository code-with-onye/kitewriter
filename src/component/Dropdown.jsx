import React, { useState, useRef } from "react";

const Dropdown = ({
  options,
  selected,
  onChange,
  className,
  label,
  onChangeVal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={`relative inline-block w-full mt-3 ${className}`} ref={ref}>
      <label htmlFor="drodown" className="text-xs font-semibold capitalize">
        {label}
      </label>
      <button
        aria-haspopup="true"
        aria-controls="menu"
        type="button"
        className="flex items-center justify-between bg-slate-200 px-2 py-2 w-full rounded-3xl "
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm tracking-wide"> {selected}</p>
        <svg
          className="absolute right-0 h-5 w-5 text-gray-400 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg h-20 overflow-y-scroll z-20">
          <div className="py-1 rounded-md bg-white shadow-xs">
            {options.map((option, i) => (
              <button
                key={i}
                className={`block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 ${
                  (typeof option === "string" && option === selected) ||
                  (typeof option !== "string" && option.name === selected) ||
                  option.title === selected
                    ? "bg-black text-white"
                    : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  onChange(
                    typeof option === "string"
                      ? option
                      : option.name
                      ? ` ${option.flag} ${option.name}`
                      : option.title
                  );
                  onChangeVal(
                    typeof option === "string"
                      ? option
                      : option.name
                      ? ` ${option.flag} ${option.name}`
                      : option.prompt
                  );
                }}
              >
                {typeof option === "string"
                  ? option
                  : option.name
                  ? `${option.flag} ${option.name} `
                  : option.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
