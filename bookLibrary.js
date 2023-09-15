"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var path = require('path');
var CustomFile = require('./fileprocess.js').CustomFile;
var myfilepath = path.resolve(__dirname, 'booklibrary.json');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    try {
        var query_1 = req.query.name;
        if (!query_1) {
            throw new Error('Name query parameter is required.');
        }
        var bookFile = new CustomFile(myfilepath);
        var allBooks = bookFile.readFileSync();
        var filteredBooks = allBooks.filter(function (book) {
            var startsWithQuery = book.name.startsWith(query_1);
            return startsWithQuery;
        });
        if (filteredBooks.length === 0) {
            res.status(404).json({ error: 'No books found with the provided name query.' });
        }
        else {
            res.json(filteredBooks);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
