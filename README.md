# react hooks workshop

## Installation

Pour installer react, lancez simplement la commande
```bash
npm install -g create-react-app
```

pour créer un nouveau projet
```
create-react-app <name-of-app>
```

remplacez <name-of-app> par le nom du fichier dans lequel vous voulez le projet.

Pour faire tourner l'app, rentrez dans le fichier nouvellement créé
```
cd <name-of-app>
```
et lancez l'app avec
```
npm start
```

Pour les besoins du projet, installez aussi uuid
```
npm install uuid --save
```

## Début du workshop
Ouvrez votre ide habituel et effacez tout le contenu d'App.js

### 1. Création de votre premier hook
On commence par importer react et le useState au début du fichier et on définit une fonction anonyme à exporter.
```javascript
import React, { useState } from 'react';

export default () => {
  //your hooks go here
  return(
    // your html goes here
  )
}
```

Voilà, vous êtes prêts à écrire votre premier hook react. Pensez à créer un objet avec un titre à passer en argument du hook.
```javascript
const [state, setState] = useState();
```
Voilà vous avez créé un hook, bravo ! Par contre personne ne peut encore le voir donc il va falloir *l'injecter* dans votre html à l'aide des `{ }`.
Dans le `return()` de votre fonction, créez une `<div>` et à l'intérieur de cette `<div>`, *injectez* le titre de votre tâche.

<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';

export default () => {
  const firstTask = {
    title: "Ecrire son premier hooks"
  }
  const [tasks, setTasks] = useState(firstTask);

  return(
    <div>
      {task.title}
    </div>
  )
}
```
</details>

Si votre app tourne ça devrait vous afficher le titre donné à votre objet dans votre navigateur. C'est pas mal mais on vous a promis une liste de tâches donc changeons 2-3 choses pour afficher une vraie liste.

D'abord changez votre objet en un tableau contenant plusieurs objets similaires ayant pour structure
```javascript
{id : uuid.v4(),
title: "le nom de tâche que vous voulez"}
```
(pensez à importer uuid)
Ensuite, utilisez l'itérateur `.map()` dans le `return()`. Affichez le titre de chaque tâche dans une `div` et assignez-y l'id comme `key`.
<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';
import uuid from 'uuid';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"    
  }];
  const [tasks, setTasks] = useState(firstTask);

  return(
    <>
      { tasks.map(task => (
        <div key={task.id}>
          {task.title}
        </div>
        )
      )}
    </>
  )
}
```
</details>

### 2. Ajout / Suppression
Maintenant qu'on sait afficher une liste de tâches, il faudrait pouvoir la complèter.
Créez un nouveau fichier javascript au même niveau qu'App.js puis importez-y react et le useState.
Procédez de la même façon que pour l'app mais en passant les `props` en argument à votre fonction et affichez un formulaire dans le `return()` qui vous permettra de saisir l'intitulé de la nouvelle tâche.

<details>
<summary>Solution</summary>

```javascript
import React, { useState } from 'react';

export default (props) => {

  const [newTask, setNewTask] = useState('');

    return(
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={newTask} onChange={onChange}></input>
        <input type="submit" value="Add task"></input>
      </form>
    </>
  )
}
```
</details>

Une fois cela fait, retournez dans App.js pour y afficher ce que vous venez de créer. Importez votre component

```javascript
import AddTask from './AddTask';
```
puis ajoutez le à vos balises HTML dans le `return()` avant le `tasks.map()`.
```javascript
<AddTask />
```

Votre component AddTask est maintenant un enfant de votre component App et peut donc recevoir ses *props* (ce qu'on a mis en argument un peu plus haut). Les props sont bien pratiques car on peut s'en servir pour passer beaucoup de choses d'un component à un autre. Dans notre cas, on voudrait passer une fonction qui permettra de changer le state de notre App.

<details>
<summary>Solution</summary>

```javascript
const addTask = (newTask) => {
  const item = {
    id: uuid.v4(),
    title: newTask
  }
  setTasks([...tasks, item])
}
```
</details>


Maintenant vous allez avoir besoin d'une fonction `onChange()` qui se chargera de mettre à jour dans le state les données saisies dans le formulaire et d'une `onSubmit()` qui gèrera leur envoi.

<details>
<summary>Solution AddTask</summary>

```javascript
import React, { useState } from 'react';

export default (props) => {

  const [newTask, setNewTask] = useState('');

  const onChange = (e) => {
    setNewTask(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.addTask(newTask);
    setNewTask('');
  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={newTask} onChange={onChange}></input>
        <input type="submit" value="Add task"></input>
      </form>
    </>
  )
}
```
</details>
<details>
<summary>Solution App</summary>

```javascript
import React, { useState } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"
  }];
  const [tasks, setTasks] = useState(firstTask);

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  return(
    <>
      <AddToDo addTask={addTask}/>
      { tasks.map(task => (
        <div key={task.id}>
          {task.title}
        </div>
        )
      )}
    </>
  )
}
```
</details>

Pour la suppression c'est *un peu plus simple*, il faut écrire une fonction qui en prenant un id comme argument va retourner le tableau de tâches actuels moins celle à supprimer.
<details>
<summary>Solution App</summary>

```javascript
import React, { useState } from 'react';
import uuid from 'uuid';

import AddToDo from './AddToDo.js';

export default () => {
  const firstTask = [{
    id: uuid.v4(),
    title: "Ecrire son premier hooks"
  },
  {
    id: uuid.v4(),
    title: "Ajouter une tâche"
  }];
  const [tasks, setTasks] = useState(firstTask);

  const addTask = (newTask) => {
    const item = {
      id: uuid.v4(),
      title: newTask
    }
    setTasks([...tasks, item])
  }

  const delTask = (id) => {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  return(
    <>
      <AddToDo addTask={addTask}/>
      { tasks.map(task => (
        <div key={task.id}>
          {task.title}          
          <button onClick={()=>delTask(task.id)}>X</button>
        </div>
        )
      )}
    </>
  )
}
```
</details>

### 3. Propsons nous dans les bois...
### 4. Utilisation du hooks useEffect
