"use client";

import React, { useState } from "react";
import { addTask } from "../../../app/actions/taskAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const [TaskTitle, setTaskTitle] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");
   const router = useRouter()
  async function addTasks(e) {
    e.preventDefault();
    try {
      await addTask(TaskTitle, TaskDescription);
         setTaskTitle("");
    setTaskDescription("");
      toast.success("Task created successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create task");
      console.error(error);
    }
  }

  return (
    <div className="w-full h-screen py-5 px-10 text-zinc-800 bg-gray-200">
      <h1 className="font-medium text-3xl mt-5">Create a new task</h1>
      <p>Create a task by adding a title and description.</p>
      <form
        onSubmit={addTasks}
        className="w-[40vw] h-fit border-2 border-gray-200 mt-5 p-5 rounded-xl shadow"
      >
        <div className="mt-5 flex flex-col gap-3">
          <div className="task-title">
            <p className="mb-2">Task Title</p>
            <input
              onChange={(e) => setTaskTitle(e.target.value)}
              value={TaskTitle}
              type="text"
              name="title"
              placeholder="Enter Title Here ..."
              required
              className="outline-none border-2 border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div className="description">
            <p className="mb-2">Description</p>
            <textarea
              onChange={(e) => setTaskDescription(e.target.value)}
              value={TaskDescription}
              name="description"
              required
              placeholder="Description about task ..."
              className="outline-none border-2 border-gray-300 p-2 rounded-md w-full h-[10vw]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#616ce5] hover:bg-[#525cd5] rounded-md text-white cursor-pointer active:scale-99 transition-all"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
