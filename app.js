//primary libraries and things
const express = require('express');
const session = require('express-session');
// const flash = require('connect-flash');
const passport = require('passport');
require('./middleware/Passport')(passport)
require('dotenv').config()
const router = express.Router();
const app = express();
// const mongoose = require('mongoose');
const connectDB = require('./db/connect.js');

//font-end navigation
const routes = require('./routes/pets.js');
const navigation = require('./routes/navigation.js');
const routesApp = require('./routes/applicationRoute.js');

//back-end navigation
const loginRoute = require('./routes/login.js');
const loginAdmin = require('./routes/loginAPI.js')

//for gridFS
const bodyParser = require('body-parser')
const upload = require('express-fileupload')

// JWT
const { authenticateToken } = require('./middleware/tokenAuthenticate.js');

const populateProducts = require('./populate.js');

const port = process.env.PORT || 5000;

//important packages
app.use(upload());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash())
// app.use((req,res,next) => {
//     res.locals.success.msg = req.flash('success_msg');
//     res.locals.error.msg = req.flash('error_msg');

// })


//middleware functions
app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use('/api/v1/applications', routesApp);
app.use('/', navigation);

app.use(express.static("./public"));

// routes for login page
app.use('/adminLogin', require('./routes/login.js'))
app.use('/api/v1/login', loginAdmin)
app.use('/users', loginRoute)


// Testing JWT
// const serverData = [
//     {
//         username: "Name_1",
//         secret: "This is the most secure token ever generated"
//     },
//     {
//         username: "Name_2",
//         secret: "This is the most secure token ever generated 1"
//     },
//     {
//         username: "Name_3",
//         secret: "This is the most secure token ever generated 2"
//     },
//     {
//         username: "Vet_Overlord",
//         secret: "Nothing to hide"
//     }
// ]

// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(serverData.filter(post => post.username === req.user.name))
// })



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await populateProducts()
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) { console.log(error) }
}
start();

module.exports = router;