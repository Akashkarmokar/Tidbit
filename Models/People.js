/**
 * External Import
 */
const mongoose = require('mongoose');

/**
 * People Collection Schema Object
 */
const PeopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    },
);

/**
 * People Collection Model
 */
const People = mongoose.model('People', PeopleSchema);
/**
 * Export People Model
 */
module.exports = People;
