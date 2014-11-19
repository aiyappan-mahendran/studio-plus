// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('Customer', {
	code : {type : String},
    name : {type : String, default: ''},
    mobileNo : {type: String, default: ''},
    phoneNo : {type: String, default: ''},
	address : {type: String, default: ''},
	location : {type: String, default: ''},
	state : {type: String, default: ''},
	emailId : {type: String, default: ''},
	activeState : {type: String, default: ''}
});