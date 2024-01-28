const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

const app = express();

const dbURI = 'mongodb+srv://codegeeks:codegeeks123@codegeekstuts.qdaclpb.mongodb.net/codegeekstuts?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then((result)=>app.listen(3000,()=>
  {
   console.log('listening for a request');   
  }))
  .catch((err)=>console.log(err));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.get('/',(req,res)=>
{
res.redirect('/blogs');
});

app.get('/about',(req,res)=>
{
    res.render('about',{title :'About'});
});

app.get('/blogs',(req,res)=>
{
Blog.find().sort({createdAt:-1})
.then((result)=>
{
    res.render('index',{title:'All blogs', blogs:result});
})
.catch((err)=>
{
    console.log(err);
}
);
});
app.get('/blogs/create',(req,res)=>
{
res.render('create',{title :'New Blog'});
});
app.get('/blogs/:id',(req,res)=>
{
const id = req.params.id;
Blog.findById(id)
.then((result)=>
{
    res.render('details',{blog:result,title:'Blog Details'})
})
.catch((err)=>
{
    console.log(err);
})
});
app.post('/blogs',(req,res)=>{
const blog = new Blog(req.body);
blog.save()
.then((result)=>
{
    res.redirect('/blogs');
})
.catch((err)=>
{
    console.log(err);
})
});

app.delete('/blogs/:id',(req,res)=>
{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(resutl=>
        {
            res.json({redirect: '/blogs'})
        })
        .catch(err=>
            {
                console.log(err);
            })
})


// app.get('/add-blog',(req,res)=>
// {
// const blog = new Blog({
//     title:'new blog 2',
//     snippet:'about blog 2',
//     body:'this include about information about blog 1',
// });
// blog.save()
// .then((result)=>
// {
//     res.send(result);
// })
// .catch((err)=>{
// console.log(err);
// });

//  });
app.use('/',(req,res)=>
{
    res.render('404',{title :'404'});
});
