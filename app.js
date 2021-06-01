require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.get('/', (request, response) => {
  response.send('<p>server up</p>')
})

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(result => {
    res.json(result)
  })
})

app.get('/info', (request, response) => {
  Contact.find({}, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      const numPeople = result.length
      const time = new Date()
      response.send(
        `<p>Phonebook has info for ${numPeople} people</p><p>${time}</p`
      )
    }
  })
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
    .then(response => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

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

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app