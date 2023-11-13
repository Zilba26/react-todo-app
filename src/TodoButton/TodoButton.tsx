import React from 'react';
import './TodoButton.css';

interface TodoButtonProps {
  onClick?: () => void;
  label: string;
}

const TodoButton: React.FC<TodoButtonProps> = (props: TodoButtonProps) => (
  <button className='todo-button' onClick={props.onClick}>
    {props.label}
  </button>
);

export default TodoButton;
