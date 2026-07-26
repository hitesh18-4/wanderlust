# WanderLust

A full-featured Airbnb-style listings app built with Node.js, Express, MongoDB, and EJS.

## Features
- Browse, search, and filter property listings by category
- Full CRUD for listings, restricted to the listing's owner
- User signup / login / logout (Passport.js local strategy, hashed passwords)
- Image upload to Cloudinary
- Location geocoding + interactive map on each listing (Mapbox)
- Reviews with star ratings, restricted to the review's author for deletion
- Server-side validation (Joi) + custom error handling
- Flash messages for success/error feedback
- "+18% GST" price toggle switch on the listings grid

## 1. Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) **or** a free MongoDB Atlas cluster
- Free accounts for:
  - [Cloudinary](https://cloudinary.com/console) (image uploads)
  - [Mapbox](https://account.mapbox.com/access-tokens/) (maps/geocoding)

## 2. Install dependencies
```bash
npm install
```

## 3. Configure environment variables
Copy `.env.example` to `.env` and fill in your own values:
```bash
cp .env.example .env
```
```
ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=any-long-random-string
CLOUD_NAME=...
CLOUD_API_KEY=...
CLOUD_API_SECRET=...
MAP_TOKEN=...
PORT=8080
```
The app will still run without `CLOUD_*`/`MAP_TOKEN` set, but image upload and the map will not work correctly until they're provided.

## 4. Seed the database (sample listings + a demo user)
```bash
npm run seed
```
This creates a demo user (`username: demo`, `password: demopassword`) who owns all the seeded listings, so you can immediately test editing/deleting a listing or logging in as the owner.

## 5. Run the app
```bash
npm run dev    # with nodemon, auto-restarts on changes
# or
npm start
```
Visit **http://localhost:8080/listings**

## Project structure
```
app.js                 # app entry point — middleware, sessions, passport, routes
cloudConfig.js          # Cloudinary + multer storage setup
middleware.js          # auth/ownership checks, Joi validation wrappers
schema.js              # Joi schemas for listings & reviews
controllers/           # route handler logic
routes/                # Express routers
models/                # Mongoose schemas (Listing, Review, User)
utils/                 # ExpressError, wrapAsync helpers
init/                  # seed data + seed script
views/                 # EJS templates (ejs-mate layout system)
public/                # static CSS/JS (style.css, script.js, map.js)
```

## Notes
- Passwords are never stored in plain text — `passport-local-mongoose` handles salting/hashing.
- Only a listing's owner can edit/delete it; only a review's author can delete it (enforced server-side in `middleware.js`, not just hidden in the UI).
- If `MAP_TOKEN` isn't set, the show page will display a friendly fallback message instead of a map.
