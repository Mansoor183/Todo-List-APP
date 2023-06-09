import React, { useState } from 'react';
import { FaRegTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-gray-100 p-4 my-2 capitalize rounded-md`,
  liComplete: `flex justify-between bg-gray-300 p-4 my-2 capitalize rounded-md`,
  row: `flex items-center justify-between w-full`,
  text: `ml-2 cursor-pointer text-gray-800 flex-grow`,
  textComplete: `ml-2 cursor-pointer line-through text-gray-500 flex-grow`,
  buttonGroup: `flex items-center`,
  checkbox: `mr-2`,
  button: `cursor-pointer ml-2 text-gray-800 hover:text-purple-500 focus:outline-none`,
  input: `border p-2 w-full text-xl focus:outline-none`,
};



const Todo = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(todo.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() === '') {
      alert('Please enter a valid todo');
      return;
    }

    updateTodo({
      ...todo,
      text: editedText,
    });

    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <div className={style.buttonGroup}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed ? 'checked' : ''}
            className={style.checkbox}
          />
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyPress={handleKeyPress}
              className={style.input}
            />
          ) : (
            <p
              onClick={() => toggleComplete(todo)}
              className={todo.completed ? style.textComplete : style.text}
              style={{ textTransform: 'none' }}
            >
              {todo.text}
            </p>
          )}
        </div>
        <div className={style.buttonGroup}>
          {isEditing ? (
            <>
              <button onClick={handleSaveEdit} className={style.button}>
                <FaSave />
              </button>
              <button onClick={handleCancelEdit} className={style.button}>
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className={style.button}>
                <FaEdit />
              </button>
              <button onClick={() => deleteTodo(todo.id)} className={style.button}>
                <FaRegTrashAlt />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};




export default Todo;
