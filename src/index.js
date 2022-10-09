const db = require('./database');
const app = require('./app');
const PORT = process.env.PORT || 8080;

db.sync().then(() => {
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}).catch(error => {
    console.error(error);
});