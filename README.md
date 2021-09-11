# README.md

This is our basic README. Here are the functionalities we discussed:

1. Weather data pollinng from some API.
2. Use GPS (sensor) to provide location to the Weather API
3. Maybe add Weather News (using some News API), so that both of us have an API to talk about in our doc.
4. Maybe a Backend Node.js that connects to MongoDB, wherein we can store Username/Passwords for Auth? Just a thought...
5. Any other ideas can be addded here!

## Weather Info API

We have used the Free OpenWeather API for fetching weather information for the current day as well as the next 7 days in our application. Using the device's Location permission, we are able to get the coordinates and find the city the user is currently residing in. The city is further provided as an input to the OpenWeather API to fetch details like description of the weather along with minimum and maximum temperature.

For more details on the API please visit their documentation: [https://openweathermap.org/guide](https://openweathermap.org/guide)
