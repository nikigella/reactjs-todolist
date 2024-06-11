import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  // Moved todos array variable here for both TodoList 
  // and TodoInput components to use
  const [todos, setTodos] = useState([]);

  // To be able to help with editing each todo item
  const [todoValue, setTodoValue] = useState('');

  // To be able to persist the todo items whenever we 
  // refresh or reload the browser page
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({
      todos: newList
    }))
  }

  // To account for DOM changes whenever we add a new todo
  // item to our todo list
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // To handle deleting of a todo item
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // To handle editing of a todo item
  function handleEditTodo(index) {
    // Select the exact todo item to be edited at the current index
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);

    // Delete the current instance of the todo item 
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos);
  }, [])

  return (
    <>
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
        <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
    </>
  )
}

export default App
