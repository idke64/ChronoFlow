"use client";
import { faArrowUp, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CalendarObject from "@/components/CalendarObject";
import WaveLine from "@/assets/waveline.svg";
import Image from "next/image";

interface Task {
  description: string;
  type: string;
  dateTime: Date; // or string if needed
}

interface CalendarViewEntry {
  tasks: Task[];
  events: Task[];
}

interface CalendarObjects {
  [key: string]: CalendarViewEntry; // Use a string index signature for dates
}

export default function Main() {
  const [prompt, setPrompt] = useState<string>("");
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  // Update calendarObjects to use CalendarObjects or null
  const [calendarObjects, setCalendarObjects] =
    useState<CalendarObjects | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/process-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure Content-Type is JSON
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const textData = await response.text();
      const data = JSON.parse(textData);

      // Merge new calendarView with existing calendarObjects
      setCalendarObjects((prevCalendarObjects) => {
        const newCalendarObjects = data.calendarView || {};

        // Combine the two objects, concatenating tasks and events for existing dates
        const mergedObjects = { ...prevCalendarObjects };

        for (const date in newCalendarObjects) {
          if (mergedObjects[date]) {
            // If the date exists in prevCalendarObjects, concatenate the tasks and events
            mergedObjects[date] = {
              tasks: [
                ...mergedObjects[date].tasks, // Keep existing tasks
                ...newCalendarObjects[date].tasks, // Add new tasks
              ],
              events: [
                ...mergedObjects[date].events, // Keep existing events
                ...newCalendarObjects[date].events, // Add new events
              ],
            };
          } else {
            // If the date doesn't exist, just add the new object
            mergedObjects[date] = newCalendarObjects[date];
          }
        }

        return mergedObjects;
      });

      setTasks((prevTasks) => {
        const newTasks = data.listView.tasks || [];

        // Return the combined array of old and new tasks
        return [...prevTasks, ...newTasks];
      });

      setPrompt("");
    } catch (error) {
      console.error("Error processing prompt:", error);
    }
    setLoading(false);
  };

  // Generate an array of 3 consecutive days starting from currDate
  const getThreeDays = (startDate: Date): Date[] => {
    const days: Date[] = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(startDate.getTime()); // Use getTime() to clone the date
      date.setDate(startDate.getDate() + i); // Add i days to the date
      days.push(date);
    }
    return days;
  };

  const threeDays = getThreeDays(currDate);

  const formatDateAddSecond = (date: Date): string => {
    // Get the full ISO string and split it to extract the date and time part
    const isoString = date.toISOString();
    const [datePart, timePart] = isoString.split("T");

    // Extract the hours, minutes, and seconds (ignoring milliseconds and 'Z')
    const timeWithSeconds = timePart.split(".")[0];

    // Combine the date and time parts into the desired format
    return `${datePart}T${timeWithSeconds}`;
  };

  const formatDate = (date: Date): string => {
    // Set the time to 00:00:00 UTC
    date.setUTCHours(0, 0, 0, 0);

    // Get the full ISO string and remove the milliseconds part
    const isoString = date.toISOString();
    // Split and return only the YYYY-MM-DDT00:00:00Z part
    return `${isoString.split(".")[0]}Z`;
  };

  return (
    <>
      <Image className="absolute -z-50 mt-40" src={WaveLine} alt="" />
      <section className="page-margins py-4">
        <div className="flex flex-col gap-y-6">
          <h2>Dashboard</h2>
          <div className="flex w-full gap-x-4">
            <div className="w-full flex gap-x-2">
              <div className="bg-surface-200 shadow px-4 py-3 w-full flex items-center gap-x-3 rounded focus-within:ring-1 ring-palette-200 duration-200">
                <button className="flex items-center justify-center hover:bg-surface-400 p-2 rounded aspect-square">
                  <FontAwesomeIcon className="h-6" icon={faPaperclip} />
                </button>

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
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                  >
                    <path
                      fill="#FFFFFF"
                      stroke="#FFFFFF"
                      stroke-width="15"
                      transform-origin="center"
                      d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"
                    >
                      <animateTransform
                        type="rotate"
                        attributeName="transform"
                        calcMode="spline"
                        dur="2"
                        values="0;120"
                        keyTimes="0;1"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </path>
                  </svg>
                ) : (
                  <FontAwesomeIcon className="text-2xl" icon={faArrowUp} />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-6 w-full min-h-[60vh]">
            <div className="bg-surface-200 w-1/3 rounded px-4 py-3 flex flex-col gap-y-3 shadow">
              <h3 className="w-full text-center">To Do</h3>
              <div className="grid grid-cols-1 w-full gap-4 rounded">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex gap-x-1.5 items-start p-4 rounded bg-surface-100 "
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 bg-surface-300 rounded-sm border-[3.5px] border-surface-300 appearance-none w-[18px] h-[18px] checked:bg-palette-100 cursor-pointer"
                      />
                      <div className="flex flex-col gap-y-1 items-start">
                        <p className="text-start">{task.description}</p>
                        <p className="text-xs">
                          {new Date(task.dateTime).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No tasks scheduled</p>
                )}
              </div>
            </div>
            <div className="bg-surface-200 w-full rounded px-4 py-3 flex flex-col gap-y-3 shadow">
              <h3 className="w-full text-center">Calendar</h3>
              <div className="grid grid-cols-3 w-full h-full gap-4">
                {threeDays.map((dayDate, index) => {
                  // Get the formatted date in the format YYYY-MM-DDTHH:MM:SSZ
                  const formattedDateAddSecond: string =
                    formatDateAddSecond(dayDate);
                  const formattedDate: string = formatDate(dayDate);

                  // Access the calendarObject using the formattedDate as the key
                  const calendarObject =
                    calendarObjects?.[formattedDate] || null; // Safe access using the formatted date

                  return (
                    <CalendarObject
                      key={index}
                      day={new Date(
                        dayDate.setDate(dayDate.getDate() + 1)
                      ).toLocaleDateString(undefined, {
                        weekday: "long",
                      })}
                      date={formattedDateAddSecond}
                      tasks={calendarObject?.tasks || []} // Use tasks from calendarObject or fallback to empty array
                      events={calendarObject?.events || []} // Use events from calendarObject or fallback to empty array
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
