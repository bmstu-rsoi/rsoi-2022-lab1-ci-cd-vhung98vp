const db = require('./database');
const app = require('./app');
const PORT = 8080;

db.sync().then(() => {
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}).catch(error => {
    console.error(error);
});