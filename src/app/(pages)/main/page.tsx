import {
  faArrowUp,
  faMagnifyingGlass,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Main() {
  return (
    <section className="page-margins py-4">
      <div className="flex w-full gap-x-4">
        <div className="w-full flex gap-x-2">
          <div className="bg-surface-200 px-4 py-3 w-full flex items-center gap-x-3 rounded-lg focus-within:ring-1 ring-palette-200 duration-200">
            <FontAwesomeIcon className="text-2xl" icon={faPaperclip} />
            <input
              className="bg-surface-200 w-full focus:outline-none"
              placeholder="Enter your prompt"
            />
          </div>
          <button className="btn-primary p-0 h-full aspect-square">
            <FontAwesomeIcon className="text-2xl" icon={faArrowUp} />
          </button>
        </div>
      </div>
    </section>
  );
}
