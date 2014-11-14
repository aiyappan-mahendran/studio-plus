// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('Customer', {
    name : {type : String, default: ''},
    code : {type : String},
    mobileNo : {type: String, default: ''},
    address : {type: String, default: ''}
});