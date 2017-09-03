const express = require('express');
const session = require('express-session');
const healthgraphql = require('./src/healthgraphql');
const passport = require('passport');
const RunKeeperStrategy = require('passport-runkeeper').Strategy;
const cors = require('cors');

const RUNKEEPER_CLIENT_ID = process.env.RUNKEEPER_CLIENT_ID;
const RUNKEEPER_CLIENT_SECRET = process.env.RUNKEEPER_CLIENT_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const PORT = process.env.PORT || 3000;
const SECURE = process.env.SECURE === 'true';
const HOSTNAME = process.env.HOSTNAME;

const PROXY = !RUNKEEPER_CLIENT_ID || !RUNKEEPER_CLIENT_SECRET || !COOKIE_SECRET;

const app = express();

if (!PROXY) {
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
    passport.use(new RunKeeperStrategy({
            clientID: RUNKEEPER_CLIENT_ID,
            clientSecret: RUNKEEPER_CLIENT_SECRET,
            callbackURL: `${SECURE ? 'https' : 'http' }://${HOSTNAME}:${PORT}/auth/callback`
        },
        (accessToken, refreshToken, profile, done) => done(null, {
            access_token: accessToken,
            id: profile.id
        })
    ));

    app.use(session({
        secret: COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: SECURE}
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth', passport.authenticate('runkeeper'), () => {});
    app.get('/auth/callback', passport.authenticate('runkeeper', {failureRedirect: '/auth/runkeeper'}), (req, res) => { res.redirect('/graphql'); });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
} else {
    app.use(cors());
}

app.use('/graphql', healthgraphql(
    PROXY ? {} : {getAccessToken: req => req.user ? req.user.access_token : null})
);

app.listen(PORT, () => {
    console.log(`Application started - ${SECURE ? 'https' : 'http' }://${HOSTNAME}:${PORT}/graphql`);

    if (!PROXY) {
        console.log(`Login at ${SECURE ? 'https' : 'http' }://${HOSTNAME}:${PORT}/auth`);
    }
});
