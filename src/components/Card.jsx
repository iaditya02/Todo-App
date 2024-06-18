import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import UpdateTodoForm from "./UpdateTodoForm";
import SingleTodoCard from "./SingleTodoCard";
import { useDispatch, useSelector } from "react-redux";
import { clearAllTodos } from "../redux/slices/todoSlice";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const Card = () => {
  //usestate to track the todos useState hook
  let myTodos = useSelector((state) => state.Todos.todos);

  //useSelector hook is used to fetch data from store
  const toggleForm = useSelector((state) => state.Todos.toggleForm);

  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos || []; // Return storedTodos if it exists, otherwise return an empty array
  });

  const dispatch = useDispatch();
  // console.log(myTodos);

  //function to clear all todos
  function clearAll() {
    dispatch(clearAllTodos());
    toast.error("All todos  have been cleared!");
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Update local storage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(myTodos));
  }, [myTodos]);

  //if toggleform true means we are not updating any todo so display all todos
  if (toggleForm) {
    return (
      <div className=" w-[95%] h-3/4 bg-amber-100 min-h-max border-gray-600 rounded-lg shadow-lg p-2 flex items-center justify-between flex-col space-y-10 sm:w-[90%] md:w-1/2 lg:w-1/2 ">
        <div className=" flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
          <h1 className=" text-3xl font-bold underline">My Todo List</h1>
          <div className=" w-3/4">
            {toggleForm ? <AddTodoForm /> : <UpdateTodoForm />}
          </div>
          <div className=" w-3/4">
            {myTodos.length !== 0 ? (
              <ul className=" w-full max-h-74 overflow-y-scroll">
                {myTodos.map((todo) => (
                  <li className=" mb-3" key={todo.id}>
                    <SingleTodoCard id={todo.id} name={todo.name} />
                  </li>
                ))}
              </ul>
            ) : todos.length !== 0 ? (
              <ul className=" w-full max-h-74 overflow-y-scroll">
                {todos.map((todo) => (
                  <li className=" mb-3" key={todo.id}>
                    <SingleTodoCard id={todo.id} name={todo.name} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className=" w-full flex flex-col items-center space-y-10">
                <h1 className=" text-2xl">Enter your First Todo Item</h1>
                <BsFillCheckCircleFill size={50} className=" text-green-500" />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={clearAll}
          className=" bg-red-500 hover:bg-red-800 text-white font-bold py-3 px-11 rounded-lg"
        >
          Clear
        </button>
      </div>
    );
  }
  //when toggleform is false means we are updating the todo so hide all the todos
  else {
    return (
      <div className="w-1/2 h-3/4 min-h-max bg-amber-100 shadow-2xl rounded-lg p-2 items-center flex flex-col space-y-10 justify-between">
        <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
          <h1 className="text-3xl font-semibold underline">
            My Todo List for Today
          </h1>
          <div className="w-3/4">
            <UpdateTodoForm />
            <div className="w-full flex flex-col items-center space-y-10 mt-20">
              <h1 className="text-2xl">Edit your todo item</h1>
              <FaEdit size={50} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
