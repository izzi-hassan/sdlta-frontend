## Assumptions I've made ##
- One FLA (Front-Line Agent) uses a single instance of the application rather than multiple windows.
- Currency codes are validly formatted (there is no need to trim and lowercase for comparison).
- The Home Currency is the standard trading medium. Customers will either give us Home Currency to purchase other currency, or give us other currency to purchase Home Currency. Customers purchasing Home Currency is the same as them selling some other currency and receiving Home Currency in return.
- I am also assuming that all currency codes are three digits
- Decided against Container / Component pattern after reading an update from Dan Abramov
- I'm using SCSS instead of Material UI's style methods.

## Things I haven't fully implemented or accounted for ##
- Authentication / Authorization (Admin / FLAs).
- Ability to switch themes.
- Multiple instances of the app running in a single office with shared currency amounts
- - I would expect this to be handled on the backend.
- Not handling the case when there is an API fetch happening with a rate refresh while a transaction is being processed. Once an agent initiates a transaction, the exchange rate at that instance is used. This is a real world observation but also trying to simplify in the interest of not spending too much time on this assignment.
- I had added a logging mechanism to store past transactions in the state but I'm removing it for simplicity
- Loading dialogs or hiding elements while data is being fetched or loaded
- I don't have time to add PropTypes or Validate Input
- I am formatting currency with commas using toLocaleString. There are other formatting considerations based on home currency we need to take into account
- We can use symbols. I'm storing the symbol information for each currency but not using it
- Auto-focus and auto-clear
- Transactions should be disabled while one is completing
- CanTransact could be more elegant 
- I'm using toPrecision rather than using a library to handle my calculations or creating my own functions.
- Keyboard controls like submit form
- I have not handled RateErrors (An error when fetching new rates)
- I have not handled Low Balance Errors (It still says success even when a transaction cannot be executed)

## Issues I couldn't figure out
- For some reason [withRouter] was not working so I had to use [connected-react-router]

## Create React App README ## 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
