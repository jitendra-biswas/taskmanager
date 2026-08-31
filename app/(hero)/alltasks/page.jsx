import Dashcard from "../../../app/Components/Dashcard"
import { HiOutlineClipboardDocumentCheck, HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { MdOutlinePendingActions } from 'react-icons/md'
import TaskList from "../../../app/Components/TaskList"
import {getCompletedTasks, getpendingTasks, getTasks} from '../../../app/actions/taskAction'

const page = async() => {

    const tasks = await getTasks();
    const completedTasks = await getCompletedTasks()
    const pendingTasks = await getpendingTasks()
     const numberOfTask = tasks.length;
     const completed = completedTasks.length;
     const pending = pendingTasks.length;
          
  
   const dashboardCardData = [
        {
            icon: <HiOutlineClipboardDocumentList className="text-2xl text-blue-600" />,
            title: "Total Tasks",
            number: numberOfTask,
            background: "bg-blue-100"
        },
        {
            icon: <HiOutlineClipboardDocumentCheck  className="text-2xl text-green-600"  />,
            title: "Completed",
            number: completed,
            background: "bg-green-100"
        },
        {
            icon: <MdOutlinePendingActions  className="text-2xl text-cyan-600" />,
            title: "Pending",
            number: pending,
            background: "bg-cyan-100"
        },
    ]
  return (
    <div className="w-full h-screen py-5 px-10 text-zinc-800">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <header className="pt-5 flex gap-3">
        {dashboardCardData.map((cardData,idx)=>{
           return <Dashcard key={idx} cardData={cardData}/>
        })}
      </header>

       <TaskList key={tasks.id} tasks={tasks}/>
    
    </div>
  )
}

export default page
