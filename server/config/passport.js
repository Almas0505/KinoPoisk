const passport = require('passport')
const User = require('../auth/user')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// 788864721348-ahe0fn2tjq2gr6jkfof01rs5tc1vj4ff.apps.googleusercontent.com
// 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

passport.use(new LocalStrategy(
    {
        usernameField: 'email'  // Specifies the field to use for the username (email)
    },
    async function(email, password, done) {
        try {
            const user = await User.findOne({ email });  // Find user by email

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Compare the provided password with the stored hash
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    return done(err); // Handle any error that occurs during comparison
                }

                if (result) {
                    return done(null, user); // If password matches, return the user
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        } catch (e) {
            return done(e); // If there’s an error finding the user, pass it to done
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: '788864721348-ahe0fn2tjq2gr6jkfof01rs5tc1vj4ff.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/auth/google",
    scope: ['openid','email' , 'profile']
  },
 async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()

    return cb(err, newUser);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id);  // Serialize user by storing their ID
});

passport.deserializeUser(async function(id, done) {
    console.log(id);
    try {
        const user = await User.findById(id);  // Find the user by ID
        done(null, user);  // Pass the user to the done callback
    } catch (err) {
        done(err, null);  // Handle any error during deserialization
    }
});


