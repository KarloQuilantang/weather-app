
async function fetchData(){
    
    // try {
    //     const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    //     if(!response.ok) {
    //         throw new Error("are you sure thats a pokemon?")
    //     }

    //     const data = await response.json();
    //     const pokemonSprite = data.sprites.front_default;
    //     const imgElement = document.getElementById("pokemonSprite");

    //     imgElement.src = pokemonSprite
    //     imgElement.style.display = "block";
    // }
    // catch(error){
    //     console.error(error)
    // }
    try {
        const location = document.getElementById("location").value.toLowerCase();
        const forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c27fdce7ad84430b8fa41655262604&q=${location}&days=2`)
        const history = await fetch(`https://api.weatherapi.com/v1/history.json?key=c27fdce7ad84430b8fa41655262604&q=${location}&dt=2024-06-01`)
        
        if(!forecast.ok){
            throw new Error("Could not fetch resource")
        }

        const forecastData = await forecast.json();
        const historyData = await history.json();

        const today = forecastData.current.cloud;
        const tomorrow = forecastData.forecast.forecastday[1].hour[23].cloud;
        const localTime = forecastData.location.localtime;
        console.log(typeof localTime); // typeof localTime;

        console.log(localTime)
        console.log(today)
        console.log(tomorrow)
        console.log(forecastData);

        console.log(historyData);
        
        
    }catch(error){
        console.error(error)
    }
}
