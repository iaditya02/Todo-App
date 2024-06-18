import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodos } from '../redux/slices/todoSlice';
import { nanoid } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const AddTodoForm = () => {

    //useState tracks the input value for form 
    const [todo,setTodo]=useState("");

    //useDispatch hook is used to fetch function inside reducer of reduxSlice
    const dispatch=useDispatch();

    //function  run when form is sumitted
    const handleSubmit=(e) =>{
        e.preventDefault();
        if(todo===""){
            alert("Enter a todo");
            setTodo("");
            return;
        }
        else{
            dispatch(addTodos({
                id:nanoid(),
                name:todo

            }))
            toast.success("Added Successfully!");
            setTodo("");
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className=' flex spaxe-x-3 flex-col sm:flex-row space-y-3 sm:space-y-0'>
            <input
            type='text'
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
            placeholder='Add Todo'
            className=' shadow-md appearance-none border rounded w-full px-3 py-2 text-gray-700 focus:outline-none'
            />
            <button
            type='submit'
            className=' bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-10 rounded mx-2'
            >
                Add
            </button>
        </form>
    </div>
  )
}

export default AddTodoForm