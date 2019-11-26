var express = require('express');
var authorRouter = express.Router();

var {authorModel}=require('../models/authorModel');
var test=[];

function route(nav) {
    authorRouter.route('/')
        .get((req, res) => {

            authorModel.find((err,data)=>{
                if(err){
                    throw err;
                }
                else{
                    test=data;
                    res.render('authors.ejs', {
                        nav,
                        title: "Authors",
                       authors:data
                    }
                    )
                }
            });

        });
    authorRouter.route('/add')
    .get((req,res)=>{
        res.render('addAuthor.ejs', {
            nav,
            title: "Add Author",
        }
        )
    })   


    authorRouter.route('/save')
    .post((req,res)=>{
        var add=new authorModel(req.body);
        add.save((err,data)=>{
            if(err){
                res.json({status:"error"});
                throw err;
            }
            else{
                res.json({status:"Success"});
            }
        });
    })

    authorRouter.route('/:id')
        .get((req, res) => {
            const id = req.params.id;
            res.render('author.ejs', {
                nav,
                title: "Author",
                author: test[id]
            }
            )
        })


    return authorRouter;
}
module.exports = route;