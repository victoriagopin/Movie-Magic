function parseError(err){
    if(err instanceof Error){
        if(!err.errors){
            err.errors = [err.message];
        }
    } else if (Array.isArray(err)){
        const error = new Error('Input validation error');
             error.erorrs = Object.fromEntries(err.map( e => [e.path, e.msg]));
      
             return error;
    }
    

    return err;
}

module.exports = {
    parseError
}