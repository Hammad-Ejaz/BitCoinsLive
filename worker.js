// weatherWorker.js

// Function to fetch weather data
async function getWeatherReport() {
    const url = "https://api.livecoinwatch.com/exchanges/single";
    const options = {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
            "x-api-key": "320c1880-fb4d-4caf-917a-1ce43ad3ccdd",
        }),
        body: JSON.stringify({
            currency: "ETH",
            code: "gemini",
            meta: true,
        }),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange data");
        }
        const result = await response.json(); // Parse response as JSON
        return result;    
    } catch (error) {
        console.error(error);
        return null; // Return null if an error occurs
    }
}

// Function to send data to the main thread
function sendDataToMainThread(data) {
    postMessage(data);
}

// Function to periodically fetch weather data and send it to the main thread
async function fetchWeatherData() {
    const weatherData = await getWeatherReport();
    sendDataToMainThread(weatherData);

    // Schedule the next fetch after 10 seconds
    setTimeout(fetchWeatherData, 10000);
}

// Start fetching weather data
fetchWeatherData();
