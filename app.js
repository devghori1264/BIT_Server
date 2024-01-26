const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 8080;

app.get('/data', async (req, res) => {
  const { n, m } = req.query;

  if (n) {
    const filePath = path.join(__dirname, `${n}.txt`);

    try {
      if (m) {
        const lineContent = await getLineContent(filePath, parseInt(m));
        if (lineContent !== undefined) {
          res.send(`Response: ${lineContent}`);
        } else {
          res.status(400).send(`Invalid line number or file does not exist.`);
        }
      } else {
        const fileContent = await getFileContent(filePath);
        res.send(`Response: ${fileContent}`);
      }
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  } else {
    res.status(400).send('Invalid request parameters.');
  }
});

async function getLineContent(filePath, lineNumber) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    if (lineNumber >= 1 && lineNumber <= lines.length) {
      return lines[lineNumber - 1];
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
}

async function getFileContent(filePath) {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    return undefined;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
