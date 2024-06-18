import { createSlice, nanoid } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState={
  todos:[],
    toggleForm:true,
    todoUpdate:{}
};

export const TodoSlice=createSlice({
    name:"ToDos",
    initialState,
    reducers:{
        //here we will write our reducers
        //adding Todos
        addTodos:(state,action)=>{
            state.todos=[...state.todos,action.payload];
        },
        clearAllTodos: (state) =>{
          state.todos = []
        },
        deleteOneTodo:(state,action)=>{
            state.todos=state.todos.filter(todo=>todo.id!==action.payload);
        },
        toggleInputForm:(state,action)=>{
            state.toggleForm=!state.toggleForm;
            state.todoUpdate={...state.todoUpdate,...action.payload};
        },
        todoUpdated:(state,action)=>{
            const todoToUpdate=state.todos.find((todo)=>todo.id===action.payload.id);
            todoToUpdate.name=action.payload.name;
            state.toggleForm=!state.toggleForm;
        },
    }
});

export const {addTodos,clearAllTodos,deleteOneTodo,toggleInputForm,todoUpdated}=TodoSlice.actions;
export default  TodoSlice.reducer;