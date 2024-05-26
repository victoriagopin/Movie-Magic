module.exports = {
    createGet : (req, res) => {
        res.render('create');
    },
    createPost : async(req, res) => {
        console.log(req.body);
        res.redirect('/');
    }
}