import React from 'react';

export default props=> {
  return (
    <div>

      <p>
        <input type="checkbox" onChange={()=>props.toggleCompletion(props.todo.id)} /> {' '}
        {props.todo.title}
        <button onClick={()=>props.delTodo(props.todo.id)}>x</button>
      </p>
    </div>
  )
  
}