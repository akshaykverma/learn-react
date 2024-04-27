import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addTodo, toggleAddUpdateBtnState, updateTodo} from '../features/todo/todoSlice'

function AddTodo() {
  
  
    const [input, setInput] = useState("");

    // todo data to update received from state
    const updatedTodoData = useSelector(state => state.updatedTodoData);
  
    // makes use of reducers to make changes in values set in store
    // basically it is used to send the input data in the reducer functions
    const dispatch = useDispatch();
    const isAddOrUpdateBtn = useSelector(state => state.toggleAddUpdateBtn);

    // used to trigger the update in the input text
    // whenever there is a change made from another component in updatedTodoData
    useEffect(() => {

      if (updatedTodoData.text) {
        setInput(updatedTodoData.text);
      }
    }, [updatedTodoData])
    

    const addTodoHandler = (e) => {
        e.preventDefault();

        // true -> Add
        if (isAddOrUpdateBtn) {

          // automatcally set input in the action.payload
          dispatch(addTodo(input));

          // resetting the input field to remove 
          // the added todo text from the input box
          setInput("");
        }
        else {
          
          // creating a copy object
          const copyUpdatedTodoData = {...updatedTodoData};
          
          // setting the updated text from the input directly
          copyUpdatedTodoData.text = input;

          dispatch(updateTodo(copyUpdatedTodoData));
          dispatch(toggleAddUpdateBtnState());

          setInput("");
        }
        
    }

    return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
          <input
            type="text"
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter a Todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {isAddOrUpdateBtn ? "Add Todo" : "Update Todo"}
          </button>
        </form>
      )
    }
    
export default AddTodo