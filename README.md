## Login
`16/04/26`
- user table:
id (primary key)
username (unique)
email (unique)
password_hash
created_at
updated_at

### Security:
- password: use hashing eg., `bcrypt`

Flow:
User sets password → hash it
Store hash in DB
On login → hash entered password → compare hashes

waht if same password? same hashes? NO. attacker can detect pattern so don't. use `salt` in `bcrypt` to avoid this

- `Redis`: to store sessions 
redis is used bcz it is fast and if frequency of request is more then it should be fast

- OTP storage in DB in case of verification:
Store in different table since datat is temporary
otp_id
user_id
otp_code
expires_at
is_used

OTP should also be hashed (most secure even if DB stoled) but after some time it will expire so reduce risk

- Captcha: 
frontend+ verification logic 
eg.,`Google reCAPTCHA`

- Session:
Session-based login works like this:

User sends email + password
Server verifies
Server creates a session(cookies: a small text file on browser, sesion: datafile on server) (on server)
Server sends back a session ID (stored on server and client(browser in the form of cookie mostly in device RAM) both and it carries cookie)
Browser automatically sends that cookie on every request.

Note: session data is stored on server only to avoid changing this sensitive info. (server RAM, server DB, In-memory cache() i.e `redis`)

- inactivity of session: 
frontend: click, mouse, keyboard, scroll etc
backend: request not received i.e for active status on each request cookie is automatically sent to browser cheking is done btw server session id and browser session id. if user reading blog without any activity he'd be logged out after some time.

how session is stretched after any activity is seen?
ans--> 
```
if (activity sensed){
        start_time = current_time;
    }
    if(current_time-start_time >= 60 mins){
        return logout();
    }
    else{
        return Logged_in();
    }
```

- Summary (after clicking login what happens?)
1. User enters email + password (frontend)

2. Frontend sends POST /login request to backend

3. Backend validates input
   - email format
   - password not empty

4. Backend queries DB:
   - find user by email

5. If user not found:
   → return error ("Invalid credentials")

6. If user found:
   → compare password using bcrypt
   (entered password vs stored hash)

7. If password mismatch:
   → return error

8. If password correct:
   → create session on server
      session_id → { user_id, last_activity }

9. Store session in:
   - memory / Redis / DB

10. Send session_id to client via cookie

11. Browser stores cookie automatically

- summary (after clicking logout what happens?)
1. User clicks logout (frontend)

2. Frontend sends request:
   POST /logout

3. Backend:
   - extracts session_id from cookie
   - deletes session from session store (DB/Redis/memory)

4. Backend clears cookie:
   - set cookie to empty OR expired

5. Response sent → user is logged out


- Middleware: function that run b4 route handler

Here it is used for:
checks session id , check session store , compares and decides to login or logout when request is sent 

- Middleware flow:
1. Incoming request

2. Extract cookie
   → get session_id

3. If no cookie:
   → reject (not logged in)

4. If session_id exists:
   → lookup in session store

5. If session not found / expired:
   → reject

6. If valid:
   → attach user info to request
   → update last_activity_time
   → allow request to proceed


- Final Login Flow
LOGIN:
→ verify password
→ create session
→ send cookie

REQUEST:
→ middleware checks session
→ allow or reject

LOGOUT:
→ delete session
→ clear cookie

- additional cookie settings:
When sending cookie:

`HttpOnly` → prevents JS access
`Secure` → only HTTPS (mention this even if not implementing)
`SameSite` → prevents CSRF



`17/04/26`
- used POST for /login route bcz, GET will show data in url POST don't.
- Thunder client - vs code extension to see POST req working 
- Coded: Server creation and route -> /login

### DB
- `npm i mysql2` for MySQL 

