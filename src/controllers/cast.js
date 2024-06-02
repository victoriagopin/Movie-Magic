module.exports = {
    createGet: async (req,res) =>{
        res.render('cast-create');
    },
    createPost: async(req,res)=>{
        console.log(req.body);

        res.end();
    }
}