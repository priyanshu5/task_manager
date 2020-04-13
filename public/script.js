
let submit = document.getElementById('submit')
// let sortBy = document.getElementById('sortBy')

submit.onclick = function () {
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const status = document.getElementById('status').value
  const duedate = document.getElementById('duedate').value
  const priority = document.getElementById('priority').value
  const note = document.getElementById('note').value

  addNewTodoJson(title, description, duedate, status, priority, note)
}


async function getTodos() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  console.log(todos)

  for (const element in todos) {
    // console.log(`${element}: ${todos[element]}`);

    var ul = document.getElementById('tasklist')

    var li = document.createElement("li");
    li.setAttribute('id', todos[element].title);
    li.setAttribute('class', 'expandable')
    li.appendChild(document.createTextNode(todos[element].title));
    ul.appendChild(li);
  }

  return todos
}

async function addTodosList() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  const len = todos.length - 1;
  console.log(len)
  var ul = document.getElementById('tasklist')

  var li = document.createElement("li");
  li.setAttribute('id', todos[len].title);
  li.appendChild(document.createTextNode(todos[len].title));
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

async function addNewTodoJson(title, description, duedate, status, priority, note) {

  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, duedate, status, priority, note })
  })

  addTodosList()

}


