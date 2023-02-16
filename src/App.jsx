import { useState, useEffect } from "react";
import Button from "./component/Button";
import Dropdown from "./component/Dropdown";
import Keyword from "./component/Keyword";
import Header from "./component/Header";
import Input from "./component/input";
import Tab from "./component/Tab";
import Textarea from "./component/Textarea";
import { Lanuage, Tone, Prompts, tabs } from "./data";

function App() {
  const [generate, setGenerate] = useState("");
  const [keyword, setKeyword] = useState([]);

  console.log(generate);
  console.log(keyword);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerate, setIsGenerate] = useState(false);

  const filtered = [];
  const [selcted, setSelected] = useState({
    language: "🇬🇧 English",
    tone: "Convicing",
    prompt: "Blog Ideas",
    description: "",
  });

  const [selctedVal, setSelectedVal] = useState({
    language: "🇬🇧 English",
    tone: "Convicing",
    prompt: "Blog Ideas",
    description: "Balablu",
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
      ` ${selctedVal.prompt}  "${description}"   trnaslate to ${selctedVal.language} make it ${selctedVal.tone}`

    );
    setIsGenerate(true);
  };
  let prompt = `${selctedVal.prompt} translate to ${selctedVal.language} make it ${selctedVal.tone}`;

  const submitPrompt = () => {
    chrome.tabs.executeScript({
      code: `document.querySelector("textarea").value = "${generate}"
       document.querySelector(".button").click();`,
    });
  };

  const addKeyword = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;
    if (!value) return;

    setKeyword([...keyword, value]);
    e.target.value = "";
  };

  const removeKeyword = (i) => {
    setKeyword(tags.filter((el, index) => index !== i));
  };

  return (
    <div className="w-80 h-60 px-2">
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

        <Keyword
          keywords={keyword}
          addKeyword={addKeyword}
          removeKeyword={removeKeyword}
        />

        {/* <Button variant="fill" size="lg" onClick={genratePrompt}>
          Generate
        </Button> */}

        <Textarea
          value={generate}
          editPrompt={(val) => {
            setGenerate(val);
            submitPrompt();
          }}
          className={generate ? "block" : "hidden"}
        />

      <Dropdown
        options={activeTab ? filtered : Prompts}
        selected={selcted.prompt}
        onChange={(val, desc) => {
          setSelected({ ...selcted, prompt: val, description: desc });
          setGenerate("");
        }}
        onChangeVal={(val) => setSelectedVal({ ...selctedVal, prompt: val })}
        // onChangeDes={(val)=> setD}
        label={activeTab ? `Select Prompt ${filter}` : "Select Prompt"}
      />
      <span className="text-xs  ">{selcted.description}</span>

      <Input
        label="Enter description"
        placeholder=""
        type="text"
        onChangeVal={(val) => {
          setDescription(val);
          setGenerate("");
        }}
      />
      <Textarea
        value={generate}
        editPrompt={(val) => {
          setGenerate(val);
          submitPrompt();
        }
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
