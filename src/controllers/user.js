const { createToken } = require('../services/token');
const {register} = require('../services/user');

module.exports = {
    registerGet: (req,res) => {
        res.render('register');
    },
    registerPost: async (req,res) =>{
        const {email, password, repass} = req.body;
        
        try{
            if(!email || !password){
                throw new Error('All fileds are required!');
            }
            if(password != repass){
                throw new Error('Passwords don\'t match!');
            }

            const user = await register(email, password);
            const token = createToken(user);

            res.cookie('token', token, {httpOnly: true});

            res.redirect('/');
        } catch (err){
            res.render('register', {data: {email}, error : err.message});
            return;
        }
    }
}