import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/slices/todoSlice";

const Todo = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const { todos } = useSelector((store) => store.todos);
  const handleSubmit = () => {
    const mergerdTodo = [{ title: todo }, ...todos];
    dispatch(addTodo(mergerdTodo));
    setTodo("");
  };

  const handleDelete = (index) => {
    const deletedTodo = todos.filter((item, i) => index != i);
    console.log(deletedTodo);
    dispatch(deleteTodo(deletedTodo));
  };

  const handleUpdate = (index) => {
    const updatedTodos = todos.map((item, i) => {
      if (i === index) {
        return { ...item, title: todo };
      }
      return item;
    });
    dispatch(updateTodo(updatedTodos));
  };

  return (
    <div style={{ border: "1px solid black", width: "50%", margin: "auto" }}>
      <input
        placeholder="title"
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Add Todo
      </button>

      <p>Todos</p>

      <div>
        {todos.map((item, index) => {
          return (
            <>
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  border: "1px solid black",
                }}
              >
                <p>{item.title}</p>
                <div>
                  <button
                    onClick={() => {
                      handleUpdate(index);
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
