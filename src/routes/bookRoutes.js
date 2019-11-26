var express = require('express');
var booksRouter = express.Router();
var {bookModel}=require('../models/bookModel');

function route(nav) {
    var test=[];
    booksRouter.route('/')
        .get((req, res) => {
            bookModel.find((err,data)=>{
                if(err){
                        throw err;
                }
                else{
                    test=data;
                    res.render('books.ejs', {
                        nav,
                        title: "Books",
                        books:data
                    })
                    }

            })       
        });

    booksRouter.route('/add')
        .get((req, res) => {
            res.render('addbooks.ejs', {
                nav, 
                title: "Add Books"
            })
        });

    booksRouter.route('/save')
        .post((req, res) => {
            var addbook=new bookModel(req.body);
            addbook.save((err,data)=>{
                if(err){
                        res.json({status:"error"});
                        throw err;
                }
                else{
                        res.json({status:"success"});
                }
            });
        })
    booksRouter.route('/delete')
    .post((req,res)=>{
        bookModel.findByIdAndDelete(req.body.id,(err,data)=>{
            if(err){
            throw err;
            }
            else{
                res.redirect('/books');
            }
        });
    })
    
    booksRouter.route('/update')
    .post((req,res)=>{
        bookModel.findByIdAndUpdate(req.body.id,{$set:req.body}, (err,data)=>{
            if(err){
            throw err;
            }
            else{
            res.json({"status":"success"});  
            }
        })
    })
    booksRouter.route('/edit')
    .post((req,res)=>{
        bookModel.findById(req.body.id, (err,data)=>{
            if(err){
            throw err;
            }
            else{
                res.render('update.ejs',{nav,
                    title: "Update",
                    data});
            }
            })

})
    booksRouter.route('/readmore')
        .post((req, res) => {
           bookModel.findById(req.body.id,(err,data)=>{
               if(err){
                   throw err;
               }
               else{
                res.render('book.ejs', {
                    nav,
                    title: "Book",
                    book: data
                })
               }
           })
            

        });
    return booksRouter;
}

module.exports = route;