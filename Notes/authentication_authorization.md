# JWT, OAuth2 & RBAC

## What is authentication & authorization ?
- Authorization: Who are you ? (e.g. Login)
- Authorization: Are you allowed to do this ? (e.g. admin can delete only)

## JWT (JSON Web Token)
- Stateless, signed token
- Structure: Header.Payload.Signature
- Stored in localstorage in SPA, or httponly cookie in secure apps.

    ### Basic JWT flow
    - User logs in, server validates token.
    - Server signs a JWT token and returns.
    - Client sends JWT in Authorization: Bearer <token>
    - Server verifies token on protected routes.

    ### NodeJs JWT setup
    ```
    npm install jsonwebtoken bcryptjs
    ```

    ### Auth Login/Signup
    ```
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';

    // On signup or password hash:
    const hash = await bcrypt.hash(password, 10);

    // On login check:
    const isMatch = await bcrypt.compare(inputPwd, user.password);

    // Create JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
    });
    ```

    ### Middleware for Route Protection
    ```
    function authMiddleware(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.sendStatus(401);
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch {
            res.sendStatus(403);
        }
    }

    ```

    ### 🔐 JWT Authentication Flow (Backend + Frontend)
    #### ✅ 1. User Logs In (Frontend → Backend)
    - The user submits login credentials (e.g., email and password) from the frontend.

    - The frontend sends a POST request to the backend login route:
    ```javascript 
    POST /api/auth/login with { email, password }.
    ```

    #### ✅ 2. Backend Verifies & Creates JWT Token
    - The backend verifies the credentials.

    - If valid, backend generates a JWT like:

    ```js
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
    ```

    - It then sets the token as an HTTP-only secure cookie (like you're doing):

    ```js
    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    ```

    - 🍪 Cookie Advantages
    httpOnly: true: JS on frontend cannot access this cookie → safe from XSS.

    secure: true: cookie only sent over HTTPS.

    sameSite: 'Strict': prevents CSRF from other domains.

    #### ✅ 3. Frontend Makes Authenticated Requests
    - On next requests (e.g. GET /api/user/profile), the browser automatically sends the cookie with the request — no need to manually attach the token.

    #### ✅ 4. Backend Auth Middleware Verifies Token
    - A middleware runs on protected routes:

    ```js
    const token = req.cookies.token;
    const user = jwt.verify(token, secret); // throws if invalid/expired
    req.user = user;
    next();
    ```
    - If the token is valid, the request proceeds; otherwise, a 401 error is returned.

    #### ✅ 5. User Logs Out
    - To logout, you clear the cookie on the backend:

    ```js
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
    ```

    ### 🔐 JWT Authentication with localStorage (Frontend + Backend)
    #### ✅ 1. User Logs In (Frontend → Backend)
    - User submits email/password via form.
    - Frontend sends request to backend:

    ```js
    axios.post('/api/auth/login', { email, password });
    ```
    #### ✅ 2. Backend Returns JWT in Response
    - Backend validates credentials.
    - On success, it generates a JWT:

    ```js
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    ```
    - Instead of setting it as a cookie, the backend sends the token in the response body:

    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    }
    ```
    #### ✅ 3. Frontend Stores JWT in localStorage
    - The frontend stores the token securely:

    ```js
    localStorage.setItem('token', response.data.token);
    ```
    #### ✅ 4. Frontend Sends JWT in Authorization Header
    - For protected requests, the frontend reads from localStorage and adds it manually:

    ```js
    const token = localStorage.getItem('token');

    axios.get('/api/profile', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });
    ```
    #### ✅ 5. Backend Middleware Verifies JWT
    - Middleware extracts the token from the request header:

    ```js
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    const user = jwt.verify(token, secret);
    req.user = user;
    next();
    ```
    #### 🔓 Logging Out
    - Just remove the token from localStorage:

    ```js
    localStorage.removeItem('token');
    ```

    ## 🧠 Why Do We Need Refresh Tokens?
    JWTs (access tokens) are:
    - 🔐 Stateless (no DB lookup needed)
    - ⌛ Short-lived (e.g. expires in 15 minutes)

    So when an access token expires, we use the refresh token to:
    ✅ Request a new access token
    ❌ Without needing to re-login

    ### 🧱 Basic Flow
    #### 1. ✅ User Logs In
    Backend issues:
    - Access Token (e.g. valid for 15 minutes)
    - Refresh Token (e.g. valid for 7 days)

    Example response:

    ```json
    {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
    }
    ```

    ### 2. 💾 Store Tokens
    - Access Token: stored in memory or localStorage
    - Refresh Token: stored in httpOnly cookie (recommended)

    ### 3. 🔐 Access Protected Routes
    Frontend sends:

    ```http
    Authorization: Bearer accessToken
    Backend verifies access token and allows access.
    ```

    #### 4. ❌ Access Token Expires
    When the access token expires, user gets 401 Unauthorized.

    #### 5. 🔁 Send Refresh Token
    Frontend sends request to refresh:

    ```h
    POST /auth/refresh-token
    Cookie: refreshToken=jwt-refresh-token
    ```
    Backend:
    - Verifies the refresh token.
    - Generates a new access token (and optionally a new refresh token).
    - Returns the new token(s).

    #### 6. ✅ New Access Token Used
    Frontend stores and uses the new access token for further requests.

    #### 🛡️ Optional: Token Rotation
    With rotation:
    - Every time you use a refresh token, the backend issues a new refresh token and invalidates the old one.
    - Prevents replay attacks.

    #### ✅ Example: Refresh Token Endpoint (Node.js)
    ```js
    app.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send('No token');

    try {
        const payload = jwt.verify(refreshToken, REFRESH_SECRET);
        const newAccessToken = jwt.sign({ id: payload.id }, ACCESS_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).send('Invalid token');
    }
    });
    ```

## RBAC (Role Based Access Control)
- Controls action based on role. Admin, editor, user.
    
    ### Middleware
    ```
    function authorizeRoles(...allowedRoles) {
        return (req, res, next) => {
            if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
            next();
        };
    }
    ```

    ### Usage
    ```
    app.delete('/users/:id', authMiddleware, authorizeRoles('admin'), deleteUser);
    ```

