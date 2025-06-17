const apiKey = "d7a0785149cb8e3726896118c467b893"; 

document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");
  const loadingText = document.getElementById("loading");

  if (city === "") {
    resultBox.innerHTML = "❗ Please enter a city name.";
    return;
  }

  // Show loading
  loadingText.classList.remove("hidden");
  resultBox.innerHTML = "";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const { name, main, weather } = data;

    resultBox.innerHTML = `
      <strong>📍 Location:</strong> ${name} <br/>
      <strong>🌡️ Temperature:</strong> ${main.temp}°C <br/>
      <strong>💧 Humidity:</strong> ${main.humidity}% <br/>
      <strong>☁️ Condition:</strong> ${weather[0].main}
    `;
  } catch (error) {
    resultBox.innerHTML = `⚠️ Error: ${error.message}`;
  } finally {
    loadingText.classList.add("hidden");
  }
}
