/* 
Things that need to do
    - create leaflet map
    - get the users location
    - after a category is selected (addeventlistener)
        - make a fetch request to the forsquare api   
            - use the place search method
            - specify lat/long, categories, and sort
                - map the location on map
                - programatically render a list of results to the screen      
 */
let selectEl = document.querySelector('select')
let listEl = document.querySelector('ul')

let map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

navigator.geolocation.getCurrentPosition((success) => {
    // position = (coords = (latitude, longitude, accuracy))
    let {coords: {latitude, longitude}} = position
    console.log('it Works', position)
    map.setView([latitude, longitude])
}, (error) => (
    console.log(error)
))

document.querySelector('button').addEventListener('click', (event) => {
    let categoryID =  document.querySelector('select').value

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3y7gA+8o98X0fp3BT9a43pp44Riqkb0E4urrRskU0llM='
        }
    };

    fetch('https://api.foursquare.com/v3/places/search?categories=${categoryID}%sort=DISTANCE&limit-5', options)
        .then(response => response.json())
        .then(({results} ) => { 
            listEl.innerHTML = ''
            for (let i = 0; i < results.length; i++) {
            results[i]
            const listItem = document.createElement('li')
            listItem.textContent = results[i].name
            listEl.append(listItem)
            }
        })
        
        .catch(err => console.error(err));
});