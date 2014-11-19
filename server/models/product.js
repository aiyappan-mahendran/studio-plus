// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    name : {type : String, default: ''},
    code : {type : String},
    minQuantity : {type: Number},
    price : {type: Number},
	activeState : {type : String, default: ''}
});