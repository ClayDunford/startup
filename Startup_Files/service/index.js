const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';



// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;


app.use(cors({
    origin: ['http://localhost:5173', 'https://startup.claydunford.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Serve up the front-end static content hosting
app.use(express.static('public'));



// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  try {
    const {username, password} = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    const existingUser = await DB.getUser(username);

    if (existingUser) {
      return res.status(409).json({ msg: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const token = uuid.v4();

    const newUser = {username, password: passwordHash, token};
    await DB.addUser(newUser);
    
    // Set auth cookie and send response
    setAuthCookie(res, token);
    res.status(201).json({ username, token});
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  try {
    const {username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    const user = await DB.getUser(username);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    user.token = uuid.v4();
    await DB.updateUser(user);

    setAuthCookie(res, user.token);
    res.json({ 
      username: user.username,
      token: user.token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});
// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  
  try {
    const token = req.cookies[authCookieName];
    if (token) {
      const user = await DB.getUserByToken(token);
      if (user) {
        delete user.token
        await DB.updateUser(user);
      }
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (err) {
    console.error('Logout Error: ', err);
    res.status(500).json({msg:'Internal server error'});
  }
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = token ? await DB.getUserByToken(token) : null;

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized"});
  }
};

// Require authentication for succulent endpoints
apiRouter.use('/succulents', verifyAuth);

const succulents = [];

// Get all succulents for current user
apiRouter.get('/succulents', async (req, res) => {
  const userSucculents = succulents.filter((s) => s.owner === req.user.username);
  res.json(userSucculents);
});

// Create a new succulent
apiRouter.post('/succulents', async (req, res) => {
  const { size = 1, water = 6, potColor = '#a97c50' } = req.body;

  const newSucculent = {
    id: uuid.v4(),
    owner: req.user.username,
    size,
    water,
    potColor,
    updatedAt: new Date().toISOString(),
  };
  succulents.push(newSucculent);
  res.status(201).json(newSucculent);
});

// Update succulent by ID
apiRouter.put('/succulents/:id', async (req, res) => {
  const succulent = succulents.find(
    (s) => s.id === req.params.id && s.owner === req.user.username);
  if (!succulent) {
    return res.status(404).json({ msg: 'Succulent not found' });
  }
  Object.assign(succulent, req.body, { updatedAt: new Date().toISOString() });
  res.json(succulent);
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Default error handler
app.use(function (err, req, res, next) {
  console.error('Unhandled error: ', err);
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});



app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
