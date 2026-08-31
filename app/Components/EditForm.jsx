"use client";

import React, { useEffect, useState } from "react";
import { getDataById, updateTask } from "../../app/actions/taskAction";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const EditForm = () => {
  const [TaskTitle, setTaskTitle] = useState("");
  const [TaskDescription, setTaskDescription] = useState("");

  const params = useParams();
  const id = params.id;

  // Get existing task when page loads
  useEffect(() => {
    async function getTask() {
      const uniqueData = await getDataById(id);

      if (uniqueData) {
        setTaskTitle(uniqueData.title);
        setTaskDescription(uniqueData.description);
      }
    }

    getTask();
  }, [id]);

  // Update task when form is submitted
  async function handleUpdate(e) {
    e.preventDefault();

    await updateTask(
      id,
      TaskTitle,
      TaskDescription
    );

    toast.success("Task Updated Successfully");
    setTaskTitle("")
    setTaskDescription("")
  }

  return (
    <div className="w-full h-screen py-5 px-10 text-zinc-800">

      <h1 className="font-medium text-3xl mt-5">
        Update existing task
      </h1>

      <p>
        Update a task by modifying the title and description.
      </p>

      <form
        onSubmit={handleUpdate}
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
            />

          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#616ce5] hover:bg-[#525cd5] rounded-md text-white cursor-pointer active:scale-99 transition-all"
          >
            Update Task
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditForm;