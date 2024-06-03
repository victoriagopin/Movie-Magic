const { getAllCast } = require("../services/cast");
const { getMovieById, attachCastToMovie } = require("../services/movieService");


module.exports = {
    attachGet: async(req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if(!movie){
            res.render('404');
            return;
        }

        const allCast = await getAllCast();

        const castInMovie = movie.cast.map(id => id.toString());

        res.render('cast-attach', {movie, allCast: allCast.filter(x => !castInMovie.find(castId => castId == x._id.toString()))});
    },
    attachPost: async(req, res)=>{
      const movieId = req.params.id;
      const castId = req.body.cast;

      if(!movieId || !castId){
        res.status(400).end();
        return;
      }

     

      if(castId == 'none'){
        const movie = await getMovieById(movieId);
        const allCast = await getAllCast();
        res.render('cast-attach', {movie, allCast, error: true});

        return;
      }

      try{
      await attachCastToMovie(movieId, castId);
      } catch (err){
        res.status(400).end();
        return;
      }

        res.redirect('/details/' + movieId);
    }
}