"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "../../app/Components/TaskCard";
import {
  getCompletedTasks,
  getpendingTasks,
} from "../../app/actions/taskAction";

const TaskList = ({ tasks }) => {
  const textHeaderData = ["All", "Completed", "Pending"];

  const [active, setActive] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  //  Update local state whenever server sends new tasks
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  async function filterTask(title) {
    setActive(title);

    if (title === "All") {
      setFilteredTasks(tasks);
    }

    if (title === "Completed") {
      const completedTasks = await getCompletedTasks();
      setFilteredTasks(completedTasks);
    }

    if (title === "Pending") {
      const pendingTasks = await getpendingTasks();
      setFilteredTasks(pendingTasks);
    }
  }

  return (
    <div className="text-zinc-800 pt-5">
      <p>Task List</p>

      <div className="tasks w-full h-fit flex flex-col gap-2">

        <header className="mt-3">
          <ul className="flex w-fit border-2 border-gray-200 rounded-full">

            {textHeaderData.map((title, idx) => (
              <li
                key={idx}
                className={`w-32 text-center py-1 rounded-full cursor-pointer hover:bg-gray-200 ${
                  active === title ? "bg-gray-200" : ""
                }`}
                onClick={() => filterTask(title)}
              >
                {title}
              </li>
            ))}

          </ul>
        </header>

        <div className="w-full h-[50vh] overflow-auto flex flex-col gap-2 scrollbar-none">

          {filteredTasks.map((tsk) => (
            <TaskCard
              key={tsk.id}
              task={tsk}
            />
          ))}

        </div>

      </div>
    </div>
  );
};

export default TaskList;