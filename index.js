const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})



// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const Note = require('./models/note')

// const app = express()



// app.use(express.static('build'))
// app.use(express.json())
// app.use(cors())


// app.get('/api/notes', (req, res) => {
//   Note.find({}).then(note => {
//     res.json(note);
//   });
// });

// //get a note and of it doesn't exist raise an error
// //if there is no note the note is null
// //if the id is malformed findById will trhow an error 
// //then the returned promise will be rejected  and the 
// // catch block will run 
// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (body.content === undefined) {
//     return response.status(400).json({ error: 'content missing' })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })

//   note.save().then(savedNote => {
//     response.json(savedNote)
//   })
// })

// //if the note was deleted succesfully 
// // return status 204 no content
// // the result could be used to check if the
// // resurce was deleted 
// app.delete('/api/notes/:id', (request, response, next) => {
// 	console.log(request);
//   Note.findByIdAndRemove(request.params.id)
//     .then(result => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })


// // By default, the updatedNote parameter of the
// // event handler receives the original document
// // without the modifications. We added the 
// //optional { new: true }parameter, which will cause
// // our event handler to be called with the new modified
// // document instead of the original.
// app.put('/api/notes/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })



// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const errorHandler = (error, req, res, next) => {
// 	console.log(error.message);

// 	if (error.name === 'CastError') {
// 		return res.status(400).send({error: 'malformed if'})
// 	}

// 	next(error);
// }
// app.use(errorHandler);

// app.use(errorHandler)

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
