let submit = document.getElementById('submit')


submit.onclick = function() {
  const task = document.getElementById('task')
  
  console.log(task.value)
  const done = document.getElementById('done')
  addNewTodoJson(task.value, done.value)
  // console.log(typeof(todos))
}

async function getTodos() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  console.log(todos)

  for (const element in todos) {
    // console.log(`${element}: ${todos[element]}`);
  
    var ul = document.getElementById('tasklist')
    
    var li = document.createElement("li");
    li.setAttribute('id',todos[element].task);
    li.appendChild(document.createTextNode(todos[element].task));
    ul.appendChild(li);
  }

  return todos
}

async function addTodosList(){
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  const len = todos.length - 1;
  console.log(len)
  var ul = document.getElementById('tasklist')
  
  var li = document.createElement("li");
  li.setAttribute('id',todos[len].task);
  li.appendChild(document.createTextNode(todos[len].task));
  ul.appendChild(li);
}

async function addNewTodoUrlEncoded(task, done, due) {
  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `task=${task}&done=${done}&due=2020-04-05`
  })
}

async function addNewTodoJson(task, done) {

  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task, done, due: '2020-04-05' })
  })

  addTodosList()

}


