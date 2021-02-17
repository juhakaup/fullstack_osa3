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

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(400).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const getRandomId = () => {
    return Math.floor(Math.random() * (99999 - 999) + 999);
  }

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Contact({
    name: body.name,
    number: body.number
  })

  person.save()
  .then(savedContact => {
    response.json(savedContact.toJSON)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
}) 

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})