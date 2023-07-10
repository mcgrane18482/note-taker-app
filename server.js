const express = require('express');
const path = require('path');
const { v4 } = require('uuid');
const {readFromFile, readAndAppend}=require('./helpers/fsUtils')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

// API ROUTES
app.get('/api/notes', (req, res)=>{
    readFromFile('db/db.json').then((data)=> res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res)=>{
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: v4()
    };
    console.log(req.body);
    readAndAppend(newNote);
    res.send('note saved successfully');
});

// HTML ROUTES
// displays the index.html file in browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// displays the notes.html file in browswer
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});