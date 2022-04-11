const User = require('../models/user')
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
	const notes = await Note
		.find({}).populate('user', { username: 1, name: 1})
	response.json(notes)

})

notesRouter.get('/:id', async (request, response, next) => {
		const note = await Note.findById(request.params.id)
		if (note) {
			response.json(note)
		} else {
			response.status(404).end()
		}


  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) {
  //       response.json(note)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

	//get the user with the id
	const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
		user: user._id
  })

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()

	response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response, next) => {
		await Note.findByIdAndRemove(request.params.id)
		response.status(204).end()

 // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})


notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

		const updatedNote = await Note.findByIdAndUpdate(
			request.params.id, 
			{ content, important },
			{ new: true, runValidators: true, context: 'query' }
		)
		response.json(updatedNote)

//   Note.findByIdAndUpdate(
//     request.params.id, 
//     { content, important },
//     { new: true, runValidators: true, context: 'query' }
//   ) 
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
})

module.exports = notesRouter