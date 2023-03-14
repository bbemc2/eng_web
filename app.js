
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
url = "mongodb+srv://" + process.env.API + "@cluster0.shflmal.mongodb.net/eng_tut_DB"

// local
// url = 'mongodb://127.0.0.1:27017/wikiDB'
mongoose.connect(url, 
{ useNewUrlParser: true, useUnifiedTopology: true })


const postSchema = {
    date: String,
    dayOfTheWeek: String, 
    s1: String,
    s2: String,
    s3: String
};

const Post = mongoose.model("Post", postSchema);

const userPostSchema = {
    user: String,
    date: String,
    s1: String,
    q1: String
};
const UserPost = mongoose.model("UserPost", userPostSchema);

const ben = new UserPost ({
    user: "ben",
    date: "9-33",
    s1: "hi",
});
// ben.save();

const post1 = new Post ({
    date: "3-11",
    dayOfTheWeek: "Monday",
    s1: "great",
    s2: "hi",
    s3: "bye"
});
// post1.save();


app.route("/")
.get(async(req,res) => { try {
    const foundArticles = await Post.find()
    res.render("home", {postArray:foundArticles});
    } catch(err){
    res.send(err)
}
})
.post(async (req,res) => { try {

    const newPost = await new Post({
        date: req.body.date,
        dayOfTheWeek: req.body.dayOfTheWeek, 
        s1: req.body.s1,
        s2: req.body.s2,
        s3: req.body.s3
    });
    newPost.save();
    res.send("success");

    } catch (err) {
        res.send(err)
    }
});



app.route("/:dayOfWeek")
.get(async(req,res) => { try {
    const foundArticles = await Post.find({dayOfTheWeek: req.params.dayOfWeek})
    res.render("dayOfWeek", {dayOfTheWeek: req.params.dayOfWeek, postArray: foundArticles});
    } catch(err){
    res.send(err)
}
});

app.post("/hw/:userID", async (req,res) => { try {

    const newUserPost = await new UserPost({
        user: userID,
        date:req.body.date,
        s1:req.body.sentence,
        q1: req.body.question
    });
    newUserPost.save();
    res.send("success");

    } catch (err) {
        res.send(err)
    }
    });


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
