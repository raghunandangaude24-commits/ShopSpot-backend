const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader) {

        return res.status(401).json({
            message: "No token"
        });
    }

    try {

        // Remove "Bearer "
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : authHeader;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        console.log(err);

        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = auth;