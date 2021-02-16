require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },   
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-23-124131"
  },   
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-1231231"
  },   
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-987234"
  }
]

app.get('/', (request, response) => {
    response.send('<p>server up</p>')
  })
  
app.get('/api/persons', (req, res) => {
  Contact.find({}).then(result => {
    res.json(result)
  })
})

app.get('/info', (request, response) => {
    numPeople = persons.length
    time = new Date()
    response.send(
        `<p>Phonebook has info for ${numPeople} people</p><p>${time}</p`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('delete', persons, id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

// app.put('/api/persons/:id', (requset, response) => {
//   const id = Number(requset.params.id)
//   console.log('update', id)
// })

const getRandomId = () => {
    return Math.floor(Math.random() * (99999 - 999) + 999);
  }

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name) {
      return response.status(400).json({error: 'name missing'})
    }
    if (persons.map(p => p.name).includes(body.name)) {
      return response.status(400).json({error: 'name must be unique'})
    } 
    if (!body.number) {
        return response.status(400).json({error: 'number missing'})
    }

    const person = new Contact({
        name: body.name,
        number: body.number
    })

    person.save().then(savedContact => {
      response.json(savedContact)
    })
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})