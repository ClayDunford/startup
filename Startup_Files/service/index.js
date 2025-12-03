const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const DB = require('./database.js');
const WebSocket = require('ws');

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
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    const existingUser = await DB.getUser(username);

    if (existingUser) {
      return res.status(409).json({ msg: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const token = uuidv4();

    const newUser = { username, password: passwordHash, token };
    await DB.addUser(newUser);

    // Set auth cookie and send response
    setAuthCookie(res, token);
    res.status(201).json({ username, token });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
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

    user.token = uuidv4();
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
        //const succulent = await DB.getSucculent(user.username);
        //if (succulent) {
        //  await DB.updateSucculent(user.username, succulent);
        //  console.log('Autosaved Succulent')
        //}
        delete user.token
        await DB.updateUser(user);
      }
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (err) {
    console.error('Logout Error: ', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  // Try cookie first, then Authorization header (Bearer <token>), then query param
  const cookieToken = req.cookies[authCookieName];
  const authHeader = req.headers && req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const queryToken = req.query && req.query.token;
  const token = cookieToken || headerToken || queryToken;

  const user = token ? await DB.getUserByToken(token) : null;

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// Require authentication for succulent endpoints
apiRouter.use('/succulents', verifyAuth);

// Get all succulents for current user
apiRouter.get('/succulents', async (req, res) => {
  try {
    const succulent = await DB.getSucculent(req.user.username);
    res.json(succulent ? [succulent] : []);
  } catch (err) {
    console.error('Get succulent error:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Create a new succulent
apiRouter.post('/succulents', async (req, res) => {
  try {
    let succulent = await DB.getSucculent(req.user.username);
    if (!succulent) {
      succulent = await DB.createSucculent(req.user.username);
      console.log('Created new succulent');
    }
    res.status(201).json(succulent);
  } catch (err) {
    console.error('Create succulent error: ', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Update succulent by ID
apiRouter.put('/succulents/:id', async (req, res) => {
  try {
    console.log('📝 PUT /succulents/:id - Request:', {
      id: req.params.id,
      username: req.user.username,
      body: req.body
    });

    const succulent = await DB.getSucculent(req.user.username);
    console.log('🔍 Found succulent:', succulent);

    if (!succulent || succulent.id !== req.params.id) {
      console.log('❌ Succulent not found or ID mismatch');
      return res.status(404).json({ msg: 'Succulent not found' });
    }

    const updateResult = await DB.updateSucculent(req.user.username, req.body);
    console.log('✅ Update result:', updateResult);

    res.json({ msg: 'Succulent updated successfully' });
  } catch (err) {
    console.error('❌ Update succulent error: ', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

apiRouter.get('gallery/succulents', async (req, res) => {
  try {
    const succulents = await DB.getAllSucculents();
    const galleryData = succulents.map(s => ({
      username: s.owner,
      savedSize: s.size,
      savedWater: s.water,
      savedPotColor: s.potColor,
      savedDate: s.updatedAt,
      idL: s.id

    }));
    res.json(galleryData);
  } catch (err) {
    console.error('Get all succulents error: ', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
})
//setInterval(async () => {
//  try {
//    const allUsers = await DB.getAllUsers();
//    if (!allUsers) return;

//    for (const user of allUsers) {
//      const succulent = await DB.getSucculent(user.username);
//      if (succulent) {
//        await DB.updateSucculent(user.username, succulent);
//        console.log('Autosaved');
//      }
//    }
//  } catch (err) {
//    console.error('Autosave error: ', err);
//  }
//}, 5 * 60 * 1000);

function setAuthCookie(res, authToken) {
  // In production we must use secure cookies and sameSite: 'none' for cross-site contexts (HTTPS).
  // In development (localhost over http) use secure: false and sameSite: 'lax' so the browser will accept/send the cookie.
  const isProduction = process.env.NODE_ENV === 'production';
  const secure = isProduction;
  const sameSite = isProduction ? 'none' : 'lax';

  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure,
    httpOnly: true,
    sameSite,
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



const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});

const wss = new WebSocketServer({ noServer: true });

const clients = new Set();

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request);
  });
});


