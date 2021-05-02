# getJacked: A Calorie and Nutrition Tracker for Bulking

**_A Calorie Counter App built for People trying to add lean muscle mass._**

## Current Feature Set

- Enter quantity and type of food into daily log.
- Remove entries from daily log.
- Track total calorie and macronutrient consumption of items entered to daily log.
- Store daily logs in IndexedDB for persistet storage. **Warning** Clearing browser data will remove history.

## Planned Features

- Add ability to track weight (Feature).
- Add and edit entries directly in daily log table (UI Improvements).
- Add Home page with editable calorie and macronutrient targets (Feature).
- Add Trends page with time-series and pie charts (Feature).

## Available Scripts

In the project directory, you can run:

### `yarn track`

Exactly the same as yarn start except that it runs on a different port.\
Allows you to take advantage of IndexedDB on unique Port to track historical nutrition data./
Open [http://localhost:9009](http://localhost:9009) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

