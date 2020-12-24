const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const db_get = require("./models/db_getter");
var cookieParser = require('cookie-parser')

var session_count = 0;

app = express();
app.use(cookieParser());

const db_url = "key";
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log("db connected")).
catch((err) => console.log(err));

app.set("view engine","ejs");


app.listen(3000);

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
	const sessionid = req.cookies["session_id"];
	
	db_get.Sessionid.findOne({session_id: sessionid})
	.then((result) =>{
		if(result != null){
			db_get.Marker.find()
			.then((result) => {
				res.render("main", {marks: result});
			});
								
			}else{
				res.redirect("/login");
			}
		
	});

	

	
	
});

app.post("/", (req,res) => {
	const sessionid = req.cookies["session_id"];

	db_get.Sessionid.deleteOne({session_id: sessionid})
	.then((result) =>{
		res.clearCookie("session_id");
		res.redirect("/login");
	});
});

app.get("/login", (req,res) => {
	
	const sessionid = req.cookies["session_id"];
	
	db_get.Sessionid.findOne({session_id: sessionid})
	.then((result) =>{
		if(result != null){
			console.log(result);
			res.redirect("/");
								
			}else{
				res.render("login")
			}
		
	});
	
	;
});

app.post("/login", (req,res) => {
	var id = session_count.toString();
	const sessionid = new db_get.Sessionid({
		session_id : id
	});

	db_get.Websiteuser.findOne({ username: req.body.username , password: req.body.password })
		.then((result) => {
			if(result != null){
				
				sessionid.save().
				then((result) => {
					res.cookie("session_id" , id);
					session_count += 1;
					res.redirect("/");
				});
				
			}else{
				res.redirect("/login");
			}

		});
	
});

app.get("/report/:id", (req,res) => {	
	const sessionid = req.cookies["session_id"];
	db_get.Sessionid.findOne({session_id: sessionid})
	.then((result) =>{
		if(result != null){
			db_get.Marker.find()
			.then((result) => {
				const id = req.params.id;
				db_get.Marker.findById(id)
				.then((result) => {
					res.render("report", {report: result});
					
				}).catch((err) => console.log(err));
			});
								
			}else{
				res.redirect("/login");
			}
		
	});	

	
});

app.post("/report/:id", (req,res) => {	
	const id = req.params.id;
	 db_get.Marker.updateOne(
		{_id:id},
		{isMarked:"1"},
		
	)
	 .then(res.redirect("/"));
	
});

app.use((req,res) => {
	res.status(404).render("404");
});
