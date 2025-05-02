# Dailies App

## Features

This application fetches and presents a set of "dailies", including facts, jokes, tropes, quotes, etc. It uses a variety of integrations to fetch this info. 


## Auth Flow

The application uses Google Login. There are integrations on both the front-end and back-end
- The front-end App component is wrpped wih <GoogleOAuthProvider> from @react-oauth/google
- The Google clientID is stored in a front-end config (Client ID is public)
- In a custom GoogleAuth component, the user can click a button to use the Google auth flow via useGoogleLogin (from @react-oauth/google)
- Once the user logs in with google, it will generate an auth code, which must be exchanged for an access token and user info
- This exchange is done on the back-end (/api/auth endpoint). Once that exchange is done, the state can be updated and access token stored
- On page refresh, the component checks for the access token, and then sends it to the back-end for validation and user-info (/api/validate)
- The backend auth functionality is in the authLib, and makes use of npm packages 'google-auth-library' and 'googleapis'


## Running the app

There is a frontend and a backend component. They can be run concurrently:
- frontend: cd frontend, npm run build, npm run start
- backend: npm run dev (this just runs the typescript without transpiling)

It can also be set up so that backend serves the frontend:
- First, build the frontend: cd frontend, npm run build -> This creates the build folder in the front-end
- Next, build the backend: cd backend, npm run build -> This runs tsc, which will output the js into the backend/dist folder
- Then, move the frontend/build folder into dist
- Then, run the backend using npm run start (node dist/index.js) 

You can also use docker. The Dockerfile performs all the steps described above:
- In the main project directory, run: `docker build -t dailies-app .`
- Then run the container: `docker run --env-file ./backend/.env -p 3001:3001 -it dailies-app` 

Or you can pull the image from DockerHub before running: `docker pull reganmeloche/dailies-app:latest`

You can also run tests and linting on the backend using the appropriate npm commands.

## Deployment
These instructions are for Azure deployment.

In the front-end index.tsx, ensure StrictMode is enabled.

### Regular App Service
Setting up the applications to run together can be accomplished using the backend `npm run build-all` command, which does the following:
- creates a dist folder
- builds the backend using tsc
- builds the front-end
- moves the front-end build to the dist folder 

Ensure that node_modules are not included with the deployment (this may need to be removed manually pre-deployment, since the .azureignore doesn't seem to work)

Ensure the .deployment file includes the following
```
[config]
SCM_DO_BUILD_DURING_DEPLOYMENT=false
```
Otherwise, Azure (oryx) may attempt to do a build, which can kill the limited memory.

Deploy *just the backend* folder to the cloud provider (e.g. Azure).

The app should be configured to run `npm install && npm run start` command. 

Make sure to set any environment variables on the prod server. When NODE_ENV=development, the app expects the frontend and backend to be run separately, and it will use env vars found in the configdev.ts folder. If production, then the backend is set up to serve files from the dist/build folder, and the env vars will come from process.env.

### Containerized App Service

If the image is in a container registry (DockerHub), then it can be deployed with an Azure App configured to pull from the registry
- Run a build: `docker build -t dailies-app .`
- Add the tag: `docker tag dailies-app reganmeloche/dailies-app:latest`
- Push the latest image to DockerHub: `docker push reganmeloche/dailies-app:latest`
- Restart the app in Azure


# TODOS

## Dev ops
- Add in a DB
- Logging, monitoring, telemetry
- General cleanup: Tests, linting, clean up packages
- CI/CD

## Features
- User functionality: Ability to save favourites ()
- RAG integration: Integrate with user's google drive and generate content
- Other Ninja API categories: exercise, nutrition, recipe, historical events, this day in history, city, weather
- Look into alternate sources for all the categories

## Styling
- Fonts and colours
- Clean up menu items
- Navbar clean up
- Icon
