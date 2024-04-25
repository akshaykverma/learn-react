import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false
        }
    ],
    // functionalities
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}

})

// custom Hook
export const useTodo = () => {
    return useContext(TodoContext);
}  

export const TodoProvider = TodoContext.Provider;

