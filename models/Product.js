var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
    Name: String,
    Description: String,
    Quantity: Number,
    Material: String,
    Size: String,
    Orientation: String,
    Foil: String,
    Price: Number,
    Status: Boolean,
    CreatedDate: Date,
    SaleDate: Date,
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});