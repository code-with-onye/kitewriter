const Input = (props) => {
  return (
    <div className={`w-full flex flex-col  ${props.className} mt-3`}>
      <label
        htmlFor={props.label}
        className="text-xs capitalize  font-semibold w-full"
      >
        {props.label}
      </label>

      <input
        type={props.type}
        placeholder={props.placeholder}
        className="outline-none bg-slate-900 text-slate-300  text-sm tracking-wide rounded-3xl px-3 w-ful py-2 "
        onChange={(e) => {
          props.onChangeVal(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
