const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Automatically serve all JSON files from data directory including nested folders
const dataPath = path.join(__dirname, 'data');

// Load all data files
const liveStreams = require('./data/liveStreamDetails.json');
const teams = require('./data/teams.json');
const documentaries = require('./data/documentaries.json');
const suggestedForYou = require('./data/suggestedforyou.json');

// Create maps for each collection
const streamMap = new Map(
    liveStreams
      .filter(stream => stream.id)
      .map(stream => [stream.id, stream])
);

const teamsMap = new Map(
    teams
      .filter(team => team.id)
      .map(team => [team.id, team])
);

const documentariesMap = new Map(
    documentaries
      .filter(doc => doc.id)
      .map(doc => [doc.id, doc])
);

const suggestedMap = new Map(
    suggestedForYou
      .filter(item => item.id)
      .map(item => [item.id, item])
);

// Add individual endpoints for each collection
app.get('/livestreams/:id', (req, res) => {
    const stream = streamMap.get(req.params.id);
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    res.json(stream);
});

app.get('/teams/:id', (req, res) => {
    const team = teamsMap.get(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
});

app.get('/documentaries/:id', (req, res) => {
    const documentary = documentariesMap.get(req.params.id);
    if (!documentary) {
      return res.status(404).json({ message: 'Documentary not found' });
    }
    res.json(documentary);
});

app.get('/suggestedforyou/:id', (req, res) => {
    const suggestion = suggestedMap.get(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: 'Suggestion not found' });
    }
    res.json(suggestion);
});

function readFilesRecursively(dir) {
      fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
          const fullPath = path.join(dir, file.name);
          if (file.isDirectory()) {
              readFilesRecursively(fullPath);
          } else if (path.extname(file.name) === '.json') {
              const relativePath = path.relative(dataPath, fullPath);
              const routeName = '/' + relativePath.replace('.json', '');
              app.get(routeName, (req, res) => {
                  res.sendFile(fullPath);
              });
              console.log(`Endpoint created: ${routeName}`);
          }
      });
}

readFilesRecursively(dataPath);

app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Access JSON files at http://localhost:${port}/{filename}`);
      console.log(`Access individual items at:`);
      console.log(`- http://localhost:${port}/livestreams/{id}`);
      console.log(`- http://localhost:${port}/teams/{id}`);
      console.log(`- http://localhost:${port}/documentaries/{id}`);
      console.log(`- http://localhost:${port}/suggestedforyou/{id}`);
});

app.post('/carousellayout', (req, res) => {
  const newCarouselData = req.body;
  const carouselPath = path.join(dataPath, 'carousellayout.json');
  fs.writeFileSync(carouselPath, JSON.stringify(newCarouselData, null, 2));
  res.json({ success: true, message: 'Carousel layout updated successfully' });
});

// app.post('/carousellayout/draft', (req, res) => {
//   const draftData = req.body;
//   const draftPath = path.join(dataPath, 'carousellayout-draft.json');
//   fs.writeFileSync(draftPath, JSON.stringify(draftData, null, 2));
//   res.json({ success: true, message: 'Draft saved successfully' });
// });
