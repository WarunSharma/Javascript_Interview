# 🔹 Cross-Site Request Forgery (CSRF)

## 1. What is CSRF?
Tricks a logged-in user into sending unwanted requests.
Exploits cookies being auto-sent by browsers.

Example:
User logged into bank.com → visits evil.com → hidden form submits money transfer.

## 2. How to Identify
State-changing requests (POST, PUT, DELETE) that rely only on cookies.
No extra verification like tokens/headers.

## 3. Prevention Techniques
### ✅ CSRF Tokens
Server generates token → Client must include it in request → Server validates.

### ✅ SameSite Cookies
Restrict cookies in cross-site requests:

res.cookie("sessionId", "abc123", { httpOnly: true, sameSite: "Strict" });

### ✅ Double Submit Cookie
Token stored in cookie.
React reads cookie → Sends token in header.
Server checks cookie vs header.

### ✅ JWT in Headers
Store JWT in memory, not cookies.
Send via Authorization: Bearer <token> header.
Reduces CSRF risk.

## 4. Best Practice (React + Node.js)
Session-based → SameSite cookies + CSRF tokens.
Token-based → JWT in Authorization header.
Never store tokens in localStorage (XSS risk).

## 5. Quick Diagram
[ User Logged In ]
        |
        v
[ evil.com → hidden request → bank.com ]
        |
        v
[ bank.com processes request with user cookies ❌ ]

## 6. Key Takeaways
CSRF = Attack on trust between browser & server.
Protect state-changing endpoints.
Use SameSite cookies + CSRF token for stronger protection.