const fs = require('fs');
const util = require('util');
const { runInNewContext } = require('vm');
const writeFile  = util.promisify(fs.writeFile);
const readFile  = util.promisify(fs.readFile);
const dataDirectory = `${__dirname}/../json/data.json`;
const { compareIds, checkFile } = require('../lib/utils')

class Books {
    async getAllBooks(req, res) {
      const fileExists = await checkFile(dataDirectory);

      if(!fileExists) {
         return res.status(200).json([]) ;
      } else {
         let data = await readFile(dataDirectory, 'utf8'); 
         return res.status(200).json(JSON.parse(data)) ;
      }
    }
    async getBooksById(req, res) {
      const fileExists = await checkFile(dataDirectory);

      if(!fileExists) {
         return res.status(404).json({message: "book not found"}) ;
      }
      let data = await readFile(dataDirectory, 'utf8'); 
      data = JSON.parse(data);
      data = data.find(book => book.id === Number(req.params.id));
      if(!data) {
         return res.status(404).json({message: "book not found"}) ;
      }
      return res.status(200).json(data) ;
    }
    async deleteBooksById(req, res) {
      const fileExists = await checkFile(dataDirectory);

      if(!fileExists) {
         return res.status(404).json([]) ;
      }
      let data = await readFile(dataDirectory, 'utf8'); 
      data = JSON.parse(data);
      const updatedData = data.filter(book => book.id !== Number(req.params.id));
      await writeFile(dataDirectory, JSON.stringify(updatedData, null, 2));
      return res.status(200).json({message: "completed"});
    }
    async addBook(req, res) {
      const fileExists = await checkFile(dataDirectory);

      if(!fileExists) {
         await writeFile(dataDirectory, "[]");
      }

      let data = await readFile(dataDirectory, 'utf8'); 
      data = JSON.parse(data);
      const book = data.find(book => book.name === req.body.name);
      if(book) {
         return res.status(200).json({message: "Book has already been added"}) ;
      }
      if(data.length === 0) {
         req.body.id = 1;
         data.push(req.body);
      } else {
         data = data.sort(compareIds);
         let maxId = data[data.length-1].id;
         maxId++;
         req.body.id = maxId;
         data.push(req.body);
      }
      await writeFile(dataDirectory, JSON.stringify(data, null, 2));
      return res.status(201).json({message: "Saved Book"}) ;
    }
    async updateBook(req, res) {
      const fileExists = await checkFile(dataDirectory);

      if(!fileExists) {
         return res.status(400).json({message: "book not found"}) ;
      }
      if(!req.body.name && !req.body.authors) {
         return res.status(400).json({message: "required fields missing"}) ;
      }
      let data = await readFile(dataDirectory, 'utf8'); 
      data = JSON.parse(data);
      const index = data.findIndex(book => book.id === Number(req.params.id));
      const updatedData = { ...data[index], ...req.body };
      data[index] = updatedData;
      if(!data) {
         return res.status(404).json({message: "book not found"}) ;
      }
      await writeFile(dataDirectory, JSON.stringify(data, null, 2));
      return res.status(200).json({message: "Updated book"}) ;
    }
}

module.exports = new Books();