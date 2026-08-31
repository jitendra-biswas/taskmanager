"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma"

//Add Task
export async function addTask(title, description) {
  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });

  revalidatePath("/");
  revalidatePath("/alltasks");

  return task;
}


//Get 3 latest task

export async function getLatestTask(){
  const Latesttasks = await prisma.task.findMany({
  orderBy: {
    createdAt: "desc",
  },
  take: 3,
}); 
return Latesttasks
}

//Get All task
export async function getTasks(){
  const tasks = await prisma.task.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });

  return tasks;
}
//Get Completed task
export async function getCompletedTasks() {
  const completedTasks = await prisma.task.findMany({
    where: {
      completed: true,
    },
  });
  return completedTasks;
}
//Get pending task
export async function getpendingTasks() {
  const pendingTasks = await prisma.task.findMany({
    where: {
      completed: false,
    },
  });
  
  return pendingTasks;
}

//Get Task by id
export async function getDataById(id){
  const individualData = await prisma.task.findUnique({
    where:{
      id:id,
    }
  });
  
  return individualData;
}

// update task
export async function updateTask(id,title,description){
 await prisma.task.update({
  where:{
    id:id,
  },
  data:{
    title,
    description
  }
 });
   revalidatePath("/");
  revalidatePath("/alltasks");
}

// update completed
export async function updateCompletd(id, completed) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      completed: completed,
    },
  });
  revalidatePath("/")
    revalidatePath("/alltasks");
}


//Delete Task
export async function deleteTask(id){
  await prisma.task.delete({
    where:{
      id:id,
    },
  });
  revalidatePath("/")
  revalidatePath("/alltasks")
}