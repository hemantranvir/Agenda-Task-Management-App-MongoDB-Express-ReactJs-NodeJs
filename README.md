# Demo MERN App with cookie based jwt authentication

Demo App based on MERN stack to demonstrate simple MERN implementation with secure api endpoints.
The Express framework uses cookie based jwt token authentication which is more secure than http
header (Token bearer) mechanism against XSS attacks.

- `passport-jwt` is used for authentication strategies
- Cookies are signed using `cookie-parser`

## Quick Start

Get up and running with a development server using the following commands

```javascript
// Install all dependencies for client & server
npm run all-install

// Run client & development server with concurrently
npm run dev

// Assumes Node and npm are installed on machine
// Server runs on http://localhost:5000 (set in app.js) and client on http://localhost:3000 (default for Create React App)
```

## TODO
- Add CSRF security
- Better Error handling
- Adding Tests
- Facebook login
