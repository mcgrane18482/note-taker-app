const express = require('express');
const path = require('path');
const app = express();
const {readFromFile}=require('./helpers/fsUtils')

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// retrieves the data from db
app.get('/api/notes', (req, res)=>{
    readFromFile('db/db.json').then((data)=> res.json(JSON.parse(data)));
});

// displays the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// displays the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});