const authorized = (req, res, next) => {
    if (req.user && req.user.type === 'admin') 
    {
        console.log("this user is an admin");
        next();
    } 
    else 
    {
        return res.status(403).send("Access denied: Admins only");
    }
}

module.exports = authorized
