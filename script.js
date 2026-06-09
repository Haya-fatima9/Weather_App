
const API_KEY = "0e27e691956e939aecff65162b24824d";
async function getWeather(){

    const city =
    document.getElementById("city").value;

    if(city===""){
        alert("Enter city name");
        return;
    }

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try{

        const response =
        await fetch(url);

        if(!response.ok){
            throw new Error(
                "City not found"
            );
        }

        const data =
        await response.json();

        displayWeather(data);

    }
    catch(error){

        document.getElementById(
            "weatherResult"
        ).innerHTML =
        error.message;
    }
}
function displayWeather(data){

    const temp =
    data.main.temp;

    const humidity =
    data.main.humidity;

    const condition =
    data.weather[0].main;

    let icon = "";

    if(condition==="Clear"){
        icon="☀️";
    }
    else if(condition==="Rain"){
        icon="🌧️";
    }
    else{
        icon="☁️";
    }

    document.getElementById(
        "weatherResult"
    ).innerHTML =

    `
    <h2>${data.name}</h2>
    <h1>${icon}</h1>
    <p>Temperature: ${temp}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Condition: ${condition}</p>
    `;
}
function getLocationWeather(){

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            const lat =
            position.coords.latitude;

            const lon =
            position.coords.longitude;

            const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            const response =
            await fetch(url);

            const data =
            await response.json();

            displayWeather(data);
        },

        ()=>{

            alert(
                "Location permission denied"
            );
        }
    );
}