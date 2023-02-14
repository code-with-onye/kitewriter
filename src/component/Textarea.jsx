const Textarea = (props) => {
  return (
    <form className={`mt-8 , ${props.className}`}>
      <p className="text-xs capitalize  font-semibold w-full">Preview prompt</p>
      <textarea
        name=""
        id=""
        cols={"36"}
        rows="5"
        className="outline-none bg-slate-900 text-slate-300  text-sm tracking-wide rounded-md px-3 pt-2 w-full "
        value={props.value}
        onChange={(e) => props.editPrompt(e.target.value)}
      ></textarea>
    </form>
  );
};

export default Textarea;
