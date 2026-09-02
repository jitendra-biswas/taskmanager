"use client"
import Link from 'next/link';
import React from 'react'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import {deleteTask,updateCompletd} from '../actions/taskAction'
import { SiTicktick } from 'react-icons/si';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const TaskCard = ({task}) => {
const router = useRouter();

  async function deleteHandler(id){
   let userPermission =  confirm("Do you want to delete task?")
   if(userPermission){
     await deleteTask(id);
     router.refresh();
     toast.success("Task deleted Successfully")
   }
  }

async function statusHandler(id) {
  if (!task.completed) {
    await updateCompletd(id, true);
    confirm("Do you want to change status to completed ?")
     router.refresh();
    toast.success("Task Completed")
   
  }
}
    
  return (
   <div className="task h-fit p-3 border-2 border-zinc-300 rounded-xl flex items-start justify-between gap-5">
            <div className="left">
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-zinc-600">
               {task.description}
              </p>
            <p className={`mt-3 text-sm font-semibold  ${task.completed ? "text-green-500" : "text-yellow-500"}`}>{task.completed ? "completed" : "pending"}</p>
            </div>
            <div className="right flex gap-3">
              <Link href={`/edittask/${task.id}`}><CiEdit className="text-xl text-blue-500 cursor-pointer hover:scale-115 transition-all active:scale-80" /></Link>
              <RiDeleteBin6Line onClick={()=>deleteHandler(task.id)}  className="text-xl text-red-500 cursor-pointer hover:scale-115 transition-all active:scale-80" />
              <SiTicktick onClick={()=>statusHandler(task.id)} className='text-xl text-green-500 cursor-pointer hover:scale-115 transition-all active:scale-80' />
            </div>
          </div>
  )
}

export default TaskCard
