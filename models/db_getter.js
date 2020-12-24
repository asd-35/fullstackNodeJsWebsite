const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const markerSchema = new Schema({
	user: {
		type: String,
	},
	image: {
		type: Object,
	},
	lat: {
		type: String,
	},
	lon: {
		type: String,
	},
	description: {
		type: String,
	},
	isMarked: {
		type: String,
	}
});

const SessionSchema = new Schema({
		session_id: {
			type: String
		}
});



const websiteUserSchema = new Schema({
	username: {
		type: String,
	},
	password: {
		type: String,
	},
		
});

const Marker = mongoose.model("Marker",markerSchema);
const Websiteuser = mongoose.model("Websiteuser",websiteUserSchema);
const Sessionid = mongoose.model("Sessionid",SessionSchema );

module.exports = {Marker , Sessionid, Websiteuser};

