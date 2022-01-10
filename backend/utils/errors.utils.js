module.exports.signUpErrors = (err)=> {
    let errors = {username: "", email: "", password:""}

    if (err.message.includes("username"))
        errors.username = "Pseudo incorrect ou déjà pris"

        // if(req.body.username.length >= 13 || req.body.username.length <= 3 .includes("username"))
        // errors.username = "le pseudo doit comporter entre 4 et 12 caractères"
    
    return errors;
}