const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, stu) => {
        if (err) return res.status(403).send("Access token expired");
        req.stu = stu;
        next();
    });
}

module.exports = authenticateToken;