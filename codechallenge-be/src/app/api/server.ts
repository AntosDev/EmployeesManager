let express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser');


// Setting up port with express js
const employeeRoutes = require('./employees')
const departmentsRoutes = require('./departments_routes')
const employmenttypesRoutes = require('./employmenttypes_routes')
const jobtitleRoutes = require('./jobtitle_routes')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/emplymenttypes', employmenttypesRoutes);
app.use('/api/jobtitles',jobtitleRoutes);

// Create port
const port = process.env.PORT || 8083;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
//app.use((req, res, next) => {
//    next(createError(404));
//});

// error handler
//app.use(function (err, req, res, next) {
//    console.error(err.message); // Log error message in our server's console
//    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
//    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
//});