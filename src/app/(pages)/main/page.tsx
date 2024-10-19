'use client';
import {
  faArrowUp,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function Main() {
  const [prompt, setPrompt] = useState("");
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    console.log(prompt);
    setPrompt("");
  };

  return (
    <section className="page-margins py-4">
      <div className="flex w-full gap-x-4">
        <div className="w-full flex gap-x-2">
          <div className="bg-surface-200 px-4 py-3 w-full flex items-center gap-x-3 rounded-lg focus-within:ring-1 ring-palette-200 duration-200">
            <FontAwesomeIcon className="text-2xl" icon={faPaperclip} />
            <input
              className="bg-surface-200 w-full focus:outline-none"
              placeholder="Enter your prompt"
              value={prompt}
              onChange={handlePromptChange}
            />
          </div>
          <button
            className="btn-primary p-0 h-full aspect-square"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon className="text-2xl" icon={faArrowUp} />
          </button>
        </div>
      </div>
    </section>
  );
}
