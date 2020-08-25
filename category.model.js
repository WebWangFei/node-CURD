const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: String,
    nickName: String,
    icon: String,
    pid: String,
    hasChildren: Boolean,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);