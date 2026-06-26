//creamos una función asíncrona
async function cargarDatos() {
    try {
        //buscamos el archivo json
        const respuesta = await fetch ('./data.json')

        //convertimos la variable de la respuesta en un array
        const datos = await respuesta.json()

        //seleccionamos el contenedor de las stats (stat)
        const contenedorStats = document.querySelector('.stats')

        let scoreTotal = 0;

        //recorremos los elementos del json
        datos.forEach(element => {
            let claseColor = element.category.toLowerCase()

            scoreTotal += element.score;

            if (claseColor === 'reaction') claseColor = 'react';
            if (claseColor === 'memory') claseColor = 'mem';
            if (claseColor === 'verbal') claseColor = 'verb';
            if (claseColor === 'visual') claseColor = 'vis';

            //creamos en texto todo el html que queramos insertar
            const estructuraStat = `
            <div class="stat ${claseColor}">
                    <div class="left">
                        <img src="${element.icon}" alt="${element.category} icon">
                        <p>${element.category}</p>
                    </div>
                    <span><strong>${element.score}</strong> / 100</span>
                </div>
            `;

            contenedorStats.innerHTML += estructuraStat;          
        });
        
        const mediaFinal = Math.round(scoreTotal / datos.length)

        const total = document.getElementById('total');

        total.textContent = mediaFinal;

    } catch (error) {
        console.error("hubo un error cargando los datos del JSON", error);
    }
}

//ejecutamos la función
cargarDatos();