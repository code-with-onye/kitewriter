import { useState, useEffect } from "react";
import Button from "./component/Button";
import Dropdown from "./component/Dropdown";
import Header from "./component/Header";
import Tab from "./component/Tab";
import Textarea from "./component/Textarea";
import { Lanuage, Tone, Prompts } from "./data";

function App() {
  const [count, setCount] = useState(0);
  const [generate, setGenerate] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState("");
  const [isGenerate, setIsGenerate] = useState(false);

  const tabs = ["All", "Ads", "Blog", "Content"];
  const filtered = [];

  const [selcted, setSelected] = useState({
    language: "🇬🇧 English",
    tone: "Convicing",
    prompt: "Blog Ideas",
  });

  const [selctedVal, setSelectedVal] = useState({
    language: "🇬🇧 English",
    tone: "Convicing",
    prompt: "Blog Ideas",
  });

  Prompts.map(
    (prompt) =>
      prompt.tags.includes(filter.toLowerCase()) && filtered.push(prompt)
  );

  useEffect(() => {
    chrome.tabs?.executeScript({
      code: `var responseContainer = document.getElementById(".markdown"); var copyButton = document.createElement("button"); copyButton.innerHTML = "Copy"; copyButton.style.marginLeft = "10px"; copyButton.addEventListener("click", function() { var responseText = responseContainer.innerText; navigator.clipboard.writeText(responseText); }); responseContainer.appendChild(copyButton);
      `,
    });
  }, []);

  const genratePrompt = () => {
    setGenerate(
      `${selctedVal.prompt} trnaslate to ${selctedVal.language} make it ${selctedVal.tone}`
    );
    setIsGenerate(true);
  };

  const submitPrompt = () => {
    chrome.tabs.executeScript({
      code: `document.querySelector("textarea").value = "${generate}"
       document.querySelector(".button").click();`,
    });
  };

  return (
    <div className="w-80 h-full px-2 py-4 bg-slate-100">
      <Header />
      <div className="text-xs border-b space-y-2">
        <p className="">Search your favorite prompt</p>
        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(index) => setActiveTab(index)}
          onTabItems={(tabItem) => setFilter(tabItem)}
        />
      </div>
      <div className="flex gap-x-2 items-center gap-y-4">
        <Dropdown
          options={Lanuage}
          selected={selcted.language}
          onChange={(val) => {
            setSelected({ ...selcted, language: val });
            setGenerate("");
          }}
          onChangeVal={(val) =>
            setSelectedVal({ ...selctedVal, language: val })
          }
          label="Select Language"
        />

        <Dropdown
          options={Tone}
          selected={selcted.tone}
          onChange={(val) => {
            setSelected({ ...selcted, tone: val });
            setGenerate("");
          }}
          onChangeVal={(val) => setSelectedVal({ ...selctedVal, tone: val })}
          label="Select Tone"
        />
      </div>

      <Dropdown
        options={activeTab ? filtered : Prompts}
        selected={selcted.prompt}
        onChange={(val) => {
          setSelected({ ...selcted, prompt: val });
          setGenerate("");
        }}
        onChangeVal={(val) => setSelectedVal({ ...selctedVal, prompt: val })}
        label={activeTab ? `Select Prompt ${filter}` : "Select Prompt"}
      />

      <Textarea
        value={generate}
        editPrompt={(val) => {
          setGenerate(val);
          submitPrompt();
        }}
        className={generate ? "block" : "hidden"}
      />

      <Button
        variant="fill"
        size="lg"
        onClick={generate ? submitPrompt : genratePrompt}
      >
        {generate ? "Go for It" : " Generate"}
      </Button>
    </div>
  );
}

export default App;
