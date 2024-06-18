import React from 'react'
import { useState } from "react";
import { BsTrashFill, BsCheckSquare } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from "react-redux";
import { deleteOneTodo, toggleInputForm } from '../redux/slices/todoSlice';


const SingleTodoCard = (props) => {

    const [done, setDone] = useState(false);
    const dispatch = useDispatch();

    function deleteOne(){
        dispatch(deleteOneTodo(props.id));
        toast.error("Task deleted successfully!");

    }

  return (
    <div className="flex justify-between bg-red-100 py-2 rounded shadow">
      <div className="px-4">
        <h1
          className={
            done ? "font-semibold line-through" : "font-semibold"
          }
        >
          {props.name}
        </h1>
      </div>
      <div className="px-4 flex space-x-4">
        <BsCheckSquare
          onClick={() => setDone(!done)}
          className="cursor-pointer text-green-700"
          size={20}
        />
        <FaEdit
          onClick={() =>
            dispatch(toggleInputForm({
                id:props.id,
                name:props.name
            }))
          }
          className="cursor-pointer text-yellow-700"
          size={20}
        />
        <BsTrashFill
          onClick={deleteOne}
          className="cursor-pointer text-red-700"
          size={20}   
        />
      </div>
    </div>
  )
}

export default SingleTodoCard