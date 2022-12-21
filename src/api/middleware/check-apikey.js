module.exports = async (req, res, next) => {
    const apiKey = await req.header('Api-Key-Access')
    
    if (apiKey != process.env.API_KEY) {
        return res.send("You're not Authorized")
    } else {
        next();
    }
}