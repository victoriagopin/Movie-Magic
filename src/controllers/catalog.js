const { getAllMovies, getMovieById } = require("../services/movieService");

const jwt = require('jsonwebtoken');

module.exports = {
    home: async(req, res) => {
        const movies = await getAllMovies();

        for (const movie of movies){
            movie.isAuthor = req.user && req.user._id == movie.author.toString();
        }

        res.render('home', {movies});
    },
    details: async(req, res) =>{
        const id = req.params.id;
        const movie = await getMovieById(id);

        if(!movie){
           return res.render('404');
        }


        movie.isAuthor = req.user && req.user._id == movie.author.toString();
        movie.starRating = ' &#x2605;'.repeat(movie.rating);

        res.render('details', {movie});
    },
    search: async(req, res) =>{
        const urlParams = new URLSearchParams(req.query);
        const search = Object.fromEntries(urlParams);
        const [title, genre, year] = Object.values(search);

        if(!title && !genre && !year){
            res.render('search', {error : true});
            return;
        }

        const movies = await getAllMovies();

        let matches = movies;

    if (title) {
        matches = matches.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (genre) {
        matches = matches.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    }

    if (year) {
        matches = matches.filter(movie => movie.year == year);
    }

    res.render('search', { movies: matches });
    }
}