const { User } = require("../db");
const FRONTEND_URL = process.env.FRONTEND_URL


module.exports = {

    verify: async (
        accessToken,
        refreshToken,
        profile,
        callback
    ) => {
        const query = {
            name: profile._json.name,
            email: profile._json.email,
            picture: profile._json.picture,
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
        const user = await loginOrsignup(query);
        return callback(null, user);
    },

    serializeUser: (user, callback) => {
        return callback(null, user);
    },

    deserializeUser: (user, callback) => {
        return callback(null, user);
    },

    callback: (req, res) => {
        res.redirect(`${FRONTEND_URL}`);
    },
}

const loginOrsignup = async (user) => {
    let existingUser;
    existingUser = await User.findByEmail(user.email)
    if (!existingUser) {
        return existingUser = await User.create(user)
    }
    else {
        return existingUser
    }
}
