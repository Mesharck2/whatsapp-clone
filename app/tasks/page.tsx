"use client";

import { api } from '@/convex/_generated/api';
import { deleteTask } from '@/convex/tasks';
import { useMutation, useQuery } from 'convex/react'
import React from 'react'

const TasksPage = () => {
    const tasks = useQuery(api.tasks.getTasks);

    const deleteTask = useMutation(api.tasks.deleteTask);
    
  return (
    <div className='p-10 flex flex-col gap-4'>
        <h1 className="text-5xl">All tasks are here in real-time</h1>
        
        {tasks?.map((task) => (
            <div key={task._id} className='flex gap-2 capitalize '>
                <span>{task._id}{` - `}{task.text}</span>
                
                <button className='button bg-red-400 rounded py-1 px-3' onClick={async () => { 
                    await deleteTask({id: task._id}); 
                    }}>
                    Delete Task
                </button>
            </div>
        ))}

    </div>
  )
}

export default TasksPage