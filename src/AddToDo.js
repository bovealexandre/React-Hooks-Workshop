import React, { useState} from 'react';

export default props =>{
  const[stateTitle, setStateTitle] = useState('')

  const onChange = e=> {setStateTitle(e.target.value)}

  function onSubmit (e) {
    e.preventDefault();
    props.addTodo(stateTitle);
    setStateTitle('');
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex'}}>
      <input 
        type="text" 
        name="title" 
        style={{flex: '10', padding: '5px'}}
        placeholder="Type in a To Do" 
        value={stateTitle}
        onChange={onChange}
      />
      <input  
        type="submit"
        value="submit"
        className="btn"
        style={{ flex: '1'}}
      />
    </form>
  )
}