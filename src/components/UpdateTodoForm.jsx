import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoUpdated } from '../redux/slices/todoSlice';
import toast from 'react-hot-toast';

const UpdateTodoForm = () => {


    //ie fetches the data from todoUpdate value from todoSlice
    const todoToUpdate=useSelector((state)=>state.Todos.todoUpdate)

    
    const [Update,setUpdate]=useState(todoToUpdate.name);

    const dispatch=useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        if(Update===""){
            alert("Enter a Todo");
            setUpdate("");
            return
        }
        else{
            dispatch(todoUpdated({
                id:todoToUpdate.id,
                name:Update
            }))
            toast.success("Task Updated Successfully!");
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className=' flex spaxe-x-3'>
            <input
            type='text'
            value={Update}
            onChange={(e)=>setUpdate(e.target.value)}
            placeholder='Update Todo'
            className=' shadow-md appearance-none border rounded w-full px-3 py-2 text-gray-700 focus:outline-none'
            />
            <button
            type='submit'
            className=' bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-7 rounded mx-2 focus:outline-none'
            >
                Update
            </button>
        </form>
    </div>
  )
}

export default UpdateTodoForm