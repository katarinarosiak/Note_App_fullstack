const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: 1,
		required: true 
	},
	name: {
		type: String,
		minlength: 1,
		required: true
	},
	passwordHash: {
		type: String,
		minlength: 5,
		required: true 
	},
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note'
		}
	]
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash
  }
})


module.exports = mongoose.model('User', userSchema)