const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const mongoURI = 'mongodb+srv://adarsh1176:7906211246Adarsh@chatbot.9sibk.mongodb.net/CHATBOT?retryWrites=true&w=majority&appName=CHATBOT';

mongoose.connect(mongoURI, { dbName: 'contactform' })
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

const Message = mongoose.model('Message', MessageSchema);


app.post('/api/contact', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message stored successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to store message' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
