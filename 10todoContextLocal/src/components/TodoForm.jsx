import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    
    const [todoMsg, setTodoMsg] = useState("");
    const {addTodo} = useTodo();

    const addNewTodo = (e) => {
        e.preventDefault();

        // we are not taking value from e as its coming from the submit event 
        // and todoMsg is already using useState so any changes will be present 
        // in todoMasg variable as its updated in OnChange

        if (todoMsg) {
            addTodo({todo: todoMsg, completed: false});
            
            // resetting the value after add 
            setTodoMsg("");
        }
    }

    return (
        <form onSubmit={addNewTodo} className="flex">
            <input
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />

            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

