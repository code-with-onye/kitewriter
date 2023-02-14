import React, { useState } from "react";

const Tab = ({ tabs, activeTab, onTabChange, onTabItems }) => {
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTabClick = (index, tabItem) => {
    onTabChange(index);
    onTabItems(tabItem);
  };

  return (
    <div className="flex overflow-x-auto w-full flex overflow-x-scroll ">
      <div
        className="flex overflow-x-scroll "
        style={{ scrollBehavior: "smooth", scrollLeft }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => handleTabClick(index, tab)}
            className={`relative inline-flex items-center  px-4 py-2 text-sm font-medium leading-5 text-xs tracking-wide   ${
              activeTab === index
                ? "text-white bg-black   rounded-3xl"
                : "text-slate-800  hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
