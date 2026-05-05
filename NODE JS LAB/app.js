const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Event = require('./models/event');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/eventLab', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
  }
  next();
});

app.get('/', (req, res) => {
  res.redirect('/events');
});

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.render('events/index', { events });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

app.get('/event/new', (req, res) => {
  res.render('events/new');
});

app.post('/event', async (req, res) => {
  try {
    const { eventName, location, eventDate, description, maxParticipants } = req.body;
    const event = new Event({ eventName, location, eventDate, description, maxParticipants });
    await event.save();
    res.redirect(`/events/${event._id}`);
  } catch (error) {
    console.error(error);
    res.redirect('/events');
  }
});



app.get('/events/:id/edit', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.redirect('/events');
    res.render('events/edit', { event });
  } catch (error) {
    console.error(error);
    res.redirect('/events');
  }
});

app.put('/events/:id', async (req, res) => {
  try {
    const { location, eventDate, description, maxParticipants } = req.body;
    await Event.findByIdAndUpdate(
      req.params.id,
      { location, eventDate, description, maxParticipants },
      { runValidators: true, new: true }
    );
    res.redirect(`/events/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.redirect('/events');
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
  } catch (error) {
    console.error(error);
    res.redirect('/events');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
