const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Automatically serve all JSON files from data directory
const dataPath = path.join(__dirname, 'data');
fs.readdir(dataPath, (err, files) => {
    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const routeName = '/' + path.basename(file, '.json');
            app.get(routeName, (req, res) => {
                res.sendFile(path.join(dataPath, file));
            });
            console.log(`Endpoint created: ${routeName}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access JSON files at http://localhost:${port}/{filename}`);
});
