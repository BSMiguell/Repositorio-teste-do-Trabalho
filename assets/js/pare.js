let map;

function success(pos) {
  const { latitude, longitude } = pos.coords;

  // Se a variável map ainda não existir, criamos o mapa
  if (map === undefined) {
    map = L.map("mapid").setView([latitude, longitude], 16);
  }
  // Caso contrário, removemos o mapa existente e criamos um novo
  else {
    map.remove();
    map = L.map("mapid").setView([latitude, longitude], 16);
  }

  // Utilizamos uma API para renderizar as ruas e partes do mapa
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Adicionamos um marcador no mapa para indicar a posição atual
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("Você está aqui!")
    .openPopup();
}

function error(err) {
  console.log(err);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
};

const watchId = navigator.geolocation.watchPosition(success, error, options);
