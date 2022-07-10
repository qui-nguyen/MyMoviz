
var mongoose = require('mongoose'); // importer moongoose
// Schema
var wishlistSchema = mongoose.Schema({
    name: String,
    img: String,
})

var wishlistModel = mongoose.model('wishlists', wishlistSchema)
// Exportation du modèle
module.exports = wishlistModel;
