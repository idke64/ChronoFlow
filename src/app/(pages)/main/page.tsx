import {
  faArrowUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Main() {
  return (
    <section className="page-margins py-4">
      <div className="flex w-full gap-x-4">
        <div className="w-full flex gap-x-2">
          <input className="bg-surface-200 w-full rounded p-4" />
          <button className="btn-primary h-full aspect-square">
            <FontAwesomeIcon className="h-14" icon={faArrowUp} />
          </button>
        </div>
      </div>
    </section>
  );
}
