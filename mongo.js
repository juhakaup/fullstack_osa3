const mongoose = require('mongoose')

const numArgs = process.argv.length

if (numArgs < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://juhaka:${password}@cluster0.gplfm.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const saveContact = (contact) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  contact.save().then(response => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}

const createContact = (name, number) => {
  const contact = new Contact({
    name: name,
    number: number,
  })
  return contact
}

const findAll = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}

if (numArgs === 3) {
  console.log('list contacts')
  findAll()
} else if (numArgs === 5) {
  console.log('create contact')
  const contact = createContact(process.argv[3], process.argv[4])
  saveContact(contact)
}