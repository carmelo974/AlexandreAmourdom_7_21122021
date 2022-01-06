module.exports.signUpErrors = (err)=> {
    let errors = {username: " ", email: " "}

    if (err.message.includes("username")){
        errors.username = "Pseudo incorrect"
    }
    return errors
}