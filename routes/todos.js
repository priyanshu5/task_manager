const { Router } = require('express')
const { Todos } = require('../db')

const route = Router()

async function sortBy(sortvalue){
  const todos = await Users.findAll({
    order: [                    // ORDER BY age DESC, name ASC
        ['sortvalue', 'ASC']
    ]
  })
  return todos

}

route.get('/', async (req, res) => {
  const todos = await Todos.findAll()
  res.send(todos)
})

route.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  
  const todo = await Todos.findByPk(req.params.id)

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})

route.post('/', async (req, res) => {
  if (typeof req.body.title !== 'string') {
    return res.status(400).send({ error: 'Task name not provided' })
  }
  
  const newTodo = await Todos.create({
      title: req.body.title,
      description: req.body.description,
      duedate: req.body.duedate,
      status: req.body.status,
      priority: req.body.priority,
      note: req.body.note
      
  })

  res.status(201).send({ success: 'New task added', data: newTodo })
})


module.exports = route
