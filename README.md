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

Voilà, vous êtes prêts à écrire votre premier hook react. Pensez à créer un objet avec un titre à passer en paramètre du hook.
```javascript
const [state, setState] = useState();
```
Voilà vous avez créé un hook, bravo ! Par contre personne ne peut encore le voir donc il va falloir *l'injecter* dans votre html.
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
title: "le nom que vous voulez"}
```
(pensez à importer uuid)
Ensuite, utilisez l'itérateur `.map()` dans le `return()` pour afficher le titre de chaque tâche.
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

  return tasks.map(task => (
      <div key={task.id}>
        {task.title}
      </div>
    )
  )
}
```
</details>

### 2. Ajout / Suppression
### 3. Propsons nous dans les bois...
### 4. Utilisation du hooks useEffect
