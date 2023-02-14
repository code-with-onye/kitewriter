import React, { useState } from "react";

const TagInput = ({ tags, addTag, removeTag }) => {
  return (
    <div className="flex items-center flex-wrap gap-[0.5em] mt-[1em] p-[0.5em] rounded-[3px] border-2 border-solid border-black">
      {tags.map((tag, i) => (
        <div
          key={i}
          className="bg-slate-200 inline-block px-[0.75em] py-[0.5em] rounded-[20px]"
        >
          <span>{tag}</span>
          <span
            onClick={() => removeTag(i)}
            className=" h-4 w-4 text-black cursor-pointer ml-[0.5em] "
          >
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={addTag}
        type="text"
        className="grow px-0 py-[0.5em] border-[none]"
        placeholder="Add keywords"
      />
    </div>
  );
};

export default TagInput;
