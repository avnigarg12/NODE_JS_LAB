const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, trim: true, required: true },
    location: { type: String, trim: true, required: true },
    eventDate: { type: Date, required: true },
    description: { type: String, trim: true, required: true },
    maxParticipants: { type: Number, required: true }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;