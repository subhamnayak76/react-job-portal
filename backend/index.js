const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/jobs', async (req, res) => {
  const jobs = await prisma.job.findMany();
  res.json(jobs);
});
app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
    });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the job.' });
  }
});

app.post('/jobs', async (req, res) => {
  const { type, title, description, salary, location ,name,email,phone} = req.body;
  const job = await prisma.job.create({
    data: { type, title, description, salary, location,name,email,phone },
  });
  res.json(job);
});

app.delete('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.job.delete({
    where: { id: parseInt(id) },
  });
  res.sendStatus(204);
});

app.put('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const { type, title, description, salary, location } = req.body;
  const job = await prisma.job.update({
    where: { id: parseInt(id) },
    data: { type, title, description, salary, location },
  });
  res.json(job);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
