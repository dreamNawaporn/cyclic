const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../model/index")
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.header['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: "no token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    // SELECT * FROM user WHERE id = req.body.userId
    User.findByPk(req.userId).then((user) => {
        // SELECT * FROM role, user, user_roles WHERE  user.id = users_roles.userId and role.id = users_roles.roleId
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role" });
            return;
        });
    });
};
isModerator = (req, res, next) => {
    // SELECT * FROM user WHERE id = req.body.userId
    User.findByPk(req.userId).then((user) => {
        // SELECT * FROM role, user, user_roles WHERE  user.id = users_roles.userId and role.id = users_roles.roleId
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role" });
            return;
        });
    });
};
isModeratorAdmin = (req, res, next) => {
    // SELECT * FROM user WHERE id = req.body.userId
    User.findByPk(req.userId).then((user) => {
        // SELECT * FROM role, user, user_roles WHERE  user.id = users_roles.userId and role.id = users_roles.roleId
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role" });
            return;
        });
    });
};
const authJWt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorAdmin: this.isModeratorAdmin,
}
module.exports = authJWt