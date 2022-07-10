var express = require("express");
var router = express.Router();
var request = require("sync-request"); // importer
var wishlistModel = require("../models/wishlists"); // importation du modèle

/* -------------------------------DATA BASE TEST---------------------------------------------*/
/* Data test
let listMovieTmp = [
  {
    name: "Minions: The Rise of Gru",
    img: "/ucLdEGaIFlpIdGlkzYj2OcXbGhz.jpg",
  },
  { name: "The Ledge", img: "/uXs7wMtsfnBFuGVogAxJXZXshFU.jpg" },
  {
    name: "Fantastic Beasts: The Secrets of Dumbledore",
    img: "/ucLdEGaIFlpIdGlkzYj2OcXbGhz.jpg",
  },
  { name: "Sonic the Hedgehog 2", img: "/7RSCL6V8BlekgVnNPok6tLW50tP.jpg" },
  { name: "The Man From Toronto", img: "/uTCfTibqtk4f90cC59bLPMOmsfc.jpg" },
];

*/

/* ROUTE FOR DB Test

router.get("/wishlist-movies-test", function (req, res, next) {
  Creat a whislist test
 for (let i = 0; i < listMovieTmp.length; i++) {
  let movieTmp = new wishlistModel (listMovieTmp[i]);
  let movieTmpSaved = await movieTmp.save();
 }
 let wishlistTmp2 = await wishlistModel.find();
   res.json({ result: true, wishlistTmp2 });
});
*/

/*GET infos of webservice movies */
router.get("/new-movies", function (req, res, next) {
  let moviesData = [];
  // exemple d’une requête vers un web service
  let requete = request(
    "GET",
    "https://api.themoviedb.org/3/discover/movie?api_key=cddbc2873ac002f1c49859b1ff387ee1&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
  );
  // transformer le résultat en JSON vers object
  let resultWS = JSON.parse(requete.body);
  let prefImg = "https://image.tmdb.org/t/p/w500";

  for (let i = 0; i < resultWS.results.length; i++) {
    resultWS.results[i].backdrop_path =
      prefImg + resultWS.results[i].backdrop_path;
  }

  for (let i = 0; i < resultWS.results.length; i++) {
    moviesData.push({
      id: resultWS.results[i].id,
      name: resultWS.results[i].title,
      desc: resultWS.results[i].overview,
      note: resultWS.results[i].vote_average,
      vote: resultWS.results[i].vote_count,
      img: resultWS.results[i].backdrop_path,
    });
  }
  res.json(moviesData);
});

/*POST movie to wishlist */
router.post("/wishlist-movie", async function (req, res, next) {
  let movie = new wishlistModel({
    name: req.body.movieName,
    img: req.body.img,
  });

  // Verify if movie is added by varibale result
  let movieSaved = await movie.save();
  res.json(movieSaved);
});

/*DELETE movie in wishlist */
router.delete("/wishlist-movie/:name", async function (req, res, next) {
  let returnDb = await wishlistModel.deleteOne({ name: req.params.name });
  let wishlistNew = await wishlistModel.find();

  // Verify if movie is deleted by property deletedCount
  let result = false;
  if (returnDb.deletedCount === 1) {
    result = true;
  }
  res.json(wishlistNew);
});

/*GET movies of whislist */
router.get("/wishlist-movie", async function (req, res, next) {
  let wishlist = await wishlistModel.find();
  res.json(wishlist);
});

module.exports = router;
