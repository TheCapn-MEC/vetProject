const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Must provide a name'],
        trim: true
    },
    Birthday: {
        type: Date,
        required: [true, 'Must provide the birthday']
    },
    Gender: {
        type: String,
        required: [true, 'Must provide their gender'],
        enum: {
            values: ['Neutered Male','Spayed Female', 'Unneutered Male', 'Unspayed Female'],
            message: '{VALUE} is not supported',
        }
    },
    Medical: {
        type: Array,
        default: null
    },
    Color: {
        type: String,
        required: [true, 'Must provide their color'],
        trim: true
    },
    Breed: {
        type: String,
        required: [true, 'Must provide their breed'],
        trim: true
    },
    Species: {
        type: String,
        required: [true, 'Must provide their species'],
        enum: {
            values: ['Dog', 'Cat'],
            message: '{VALUE} is not supported',
        }
    },
    Personality: {
        type: Array,
        required: [true, 'Must provide one personality trait']
    },
    Notes: {
        type: String,
        default: null,
        trim: true
    },
    IMG: {
        type: Array,
        required: [true, 'Must provide at least 3 landscape images']
    }
});

module.exports = mongoose.model('pets', PetSchema);