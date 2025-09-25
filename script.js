let map;
let marker;

function initMap() {
    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [38, 38],
        iconAnchor: [19, 38]
    });

    marker = L.marker([0, 0], { icon: customIcon }).addTo(map);
}

async function getData() {
    const ip = document.getElementById("searchInput").value.trim();
    try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SDTKlfxOHphlknnmrApScbb2uxY9l&ipAddress=${ip}`);
        const data = await res.json();

        document.getElementById("ip").textContent = `${data.ip}`;
        document.getElementById("location").textContent = `${data.location.city}, ${data.location.region}  ${data.location.postalCode}`;
        document.getElementById("timezone").textContent = `UTC ${data.location.timezone}`;
        document.getElementById("isp").textContent = `${data.isp}`;


        map.setView([data.location.lat, data.location.lng], 13);
        marker.setLatLng([data.location.lat, data.location.lng]);

    } catch(err) {
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded", initMap);
