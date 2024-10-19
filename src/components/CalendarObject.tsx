import { FC } from "react";

interface Task {
  description: string;
  type: string;
  dateTime: Date;
}

interface CalendarObjectProps {
  day: string;
  date: string;
  tasks: Task[];
  events: Task[];
}

const CalendarObject: FC<CalendarObjectProps> = ({
  day,
  date,
  tasks,
  events,
}) => {
  const allItems = [...tasks, ...events];

  return (
    <div className="bg-surface-100 rounded px-4 py-3 h-full">
      <div className="flex flex-col items-center gap-y-3">
        <div className="flex flex-col items-center text-center">
          <h4>{day}</h4>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>

        <div className="w-full h-[1px] bg-white" />
        <div className="flex flex-col w-full">
          {allItems.length === 0 ? (
            <p className="text-center">No tasks or events for today.</p>
          ) : (
            allItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-full hover:bg-surface-400 p-2 rounded duration-200 cursor-pointer"
              >
                <div className="flex justify-between">
                  <p>{item.description}</p>
                  <p
                    className={
                      item.type === "Task"
                        ? "text-palette-100"
                        : "text-palette-200"
                    }
                  >
                    {item.type}
                  </p>
                </div>
                <p className="text-xs">
                  {new Date(item.dateTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    timeZoneName: "short",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarObject;
