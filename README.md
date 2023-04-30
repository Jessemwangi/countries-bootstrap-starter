## Countries and Weather App
A web application that allows users to authenticate with Google OAuth and access a list of countries from restcountries.com, as well as view current weather conditions from OpenWeatherMap. The app includes a metric distance calculator that allows users to enter a start and destination and receive a path and distance in kilometers. User data is currently stored in local storage, but in the second sprint, the app will be merged with Firestore to store data in the cloud.

### Features
        - Google OAuth authentication
        - List of countries from restcountries.com
        - Current weather conditions from OpenWeatherMap
        - Metric distance calculator
        - User favorite country selection
        - User country deletion
        - Local storage for user data (to be replaced with Firestore in the future)

### Technologies

This app was built using the following technologies:

        - React Redux
        - local storage
        - JavaScript
        - Google OAuth
        - Bootstrap / CSS
        - restcountries API | OpenWeatherMap API | GoogleMaps API
        - HTML
___

### Map Functionality
The app also has map functionality that allows you to select two locations and shows you the favorite route and the distance between the source and destination.

We hope you enjoy using our app!



### Setup and Installation

1. Create a map API from Google by visiting the [Google Cloud Console](https://console.cloud.google.com/apis/) and enabling the 'Maps JavaScript API'.
2. Create an API key for [OpenWeatherMap](https://openweathermap.org/) to access weather data.
3. Replace the keys in `REACT_APP_OPENWEATHER_KEY` and `REACT_APP_GOOGLE_MAPS_API_KEY` in your environment variables with the corresponding API keys.
4. Open the application in your favorite IDE and run `npm i` or `yarn i` to install the required packages.

That's it! You should now be able to run the application locally. If you encounter any issues during installation, please refer to the documentation or reach out to our support team for assistance.

___

This app is a work in progress and will continue to be developed in future sprints. 