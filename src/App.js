import React,{useState, useEffect} from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo'
import ToDos from './ToDos'
import './App.css';

export default () =>{
  const [toDos, setToDos] = useState([]);
  const [toDosRemaining, setToDosRemaining] = useState(0);


  function addToDo(title){
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }
    setToDos([...toDos, newTodo]);
  }

  function toggleCompletion(id){
    setToDos(toDos.map(toDo => {
          if(toDo.id === id) {
            toDo.completed = !toDo.completed
          }
          return toDo;
        }));
  }

  function delToDo(id){
    setToDos([...toDos.filter(todo => todo.id !== id)])  
  }

  useEffect(() => { setToDosRemaining(toDos.filter(task => !task.completed).length) }, [toDos]);

  return (
    <div className="App">
      <AddToDo addTodo={addToDo} />
      <div>
        To Dos Remaining : {toDosRemaining} / {toDos.length}
      </div>
      <ToDos todos={toDos} toggleCompletion={toggleCompletion} delTodo={delToDo} />
    </div>
  );
}
