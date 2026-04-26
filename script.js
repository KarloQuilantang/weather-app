
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
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c27fdce7ad84430b8fa41655262604&q=${location}`)
        
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        const condition = data.current.condition.text;

        console.log(condition);
    }catch(error){
        console.error(error)
    }
}
