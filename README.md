## Countries App
This app displays a list of countries from restcountries.com and current weather conditions from <a href='https://openweathermap.org/'> OpenWeatherMap </a> . To access the list of countries, a user has to be authenticated using Google OAuth. Once a user logs in, they can view the list of countries, select their favorite countries, and delete unwanted countries from the list.

Note that the system does not store data in a database but uses local storage. This means that if you change your PC or browser, your data won't be available. However, in the second sprint, we plan to merge the app with Firestore to store user data in the cloud.

### Technologies
This app was built using the following technologies:

        - React
        - Redux
        - JavaScript
        - Google OAuth
        - Bootstrap
        - CSS
        - HTML
### Map Functionality
The app also has map functionality that allows you to select two locations and shows you the favorite route and the distance between the source and destination.

We hope you enjoy using our app!



### Setup and Installation

1. Create a map API from Google by visiting the [Google Cloud Console](https://console.cloud.google.com/apis/) and enabling the 'Maps JavaScript API'.
2. Create an API key for [OpenWeatherMap](https://openweathermap.org/) to access weather data.
3. Replace the keys in `REACT_APP_OPENWEATHER_KEY` and `REACT_APP_GOOGLE_MAPS_API_KEY` in your environment variables with the corresponding API keys.
4. Open the application in your favorite IDE and run `npm i` or `yarn i` to install the required packages.

That's it! You should now be able to run the application locally. If you encounter any issues during installation, please refer to the documentation or reach out to our support team for assistance.
