const express = require('express');
import { json } from "body-parser";
import { Request, Response, NextFunction } from "express"
const app = express();
const path=require('path')
const {CustomFile} =require('./fileprocess.js')
const myfilepath:any=path.resolve(__dirname,'booklibrary.json')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res:Response) => {
    try {
        const query = req.query.name as string;
        if (!query) {
          throw new Error('Name query parameter is required.');
        }
        const bookFile = new CustomFile(myfilepath);
        const allBooks = bookFile.readFileSync();
        const filteredBooks = allBooks.filter((book: { name: string }) => {
          const startsWithQuery = book.name.startsWith(query);
          return startsWithQuery;
        });
        
        
    
        if (filteredBooks.length === 0) {
          res.status(404).json({ error: 'No books found with the provided name query.' });
        } else {
          res.json(filteredBooks);
        }
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
