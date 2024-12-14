# Dailies App


## Running the app

There is a frontend and a backend component. They can be run concurrently:
- frontend: cd frontend, npm run build, npm run start
- backend: npm run dev (this just runs the typescript without transpiling)

It can also be set up so that backend serves the frontend:
- First, build the frontend: cd frontent, npm run build -> This creates the build folder in the front-end
- Next, build the backend: cs backend, npm run build -> This runs tsc, which will output the js into the backend/dist folder
- Then, move the frontend/build folder into dist
- Then, run the backend using npm run start (node dist/index.js) 

You can also run tests and linting on the backend using the appropriate npm commands.

## Deployment

Setting up the applications to run together can be accomplished using the backend npm run build-all command.

Then deploy just the backend folder to the cloud provider (e.g. Azure).

The app should be configured to simply run the `npm run start` command.

Also make sure to set any environment variables. When NODE_ENV=development, the app expects the frontend and backend to be run separately, and it will use env vars found in the configdev.ts folder. If production, then the backend is set up to serve files from the dist/build folder, and the env vars will come from process.env.


# TODOS

## Dev ops
- More tests and linting
- Containerization (docker file, etc) - deploy with docker
- CI/CD

## Features
- Auth: Ensure google auth integration is working - allow log in, log out, fetching details
- User functionality: Ability to save favourites ()
- LLM integration: Integrate with user's google drive and generate content
- Other Ninja API categories: exercise, nutrition, recipe, historical events, this day in history, city, weather
- Look into alternate sources for all the categories

## Styling
- Fonts and colours
- Clean up menu items
- Navbar clean up
- Icon
