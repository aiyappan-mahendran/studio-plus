// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('Customer', {
	code : {type : String},
    name : {type : String, default: ''},
    mobileNo : {type: Number},
    phoneNo : {type: Number},
	address : {type: String, default: ''},
	location : {type: String, default: ''},
	state : {type: String, default: ''},
	emailId : {type: String, default: ''},
	activeState : {type: String, default: ''}
});