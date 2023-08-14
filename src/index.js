import { addTileLayer, validateIp, getAddress, addOffset } from './helpers';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '../images/icon-location.svg';
import 'babel-polyfill';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
const infoIp = document.querySelector('#ip');
const infoLocation = document.querySelector('#location');
const infoTimezone = document.querySelector('#timezone');
const infoIsp = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    // iconAnchor: [22, 94],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        getAddress(ipInput.value).then(setData);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setData(data) {
    const { lat, lng, country, region, timezone } = data.location;
    infoIp.innerText = data.ip;
    infoLocation.innerText = country + ' ' + region;
    infoTimezone.innerText = timezone;
    infoIsp.innerText = data.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    if (matchMedia('(max-width: 1023px)').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('102.22.22.1').then(setData);
});
