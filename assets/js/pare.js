var map;

function success(pos) {
  // Se a variavel map ainda não existir(for igual a undefined
  // criamos o mapa)
  if (map === undefined) {
    map = L.map("mapid").setView(
      [pos.coords.latitude, pos.coords.longitude],
      16
    );
  }
  // Já se a variavel já tiver valor atribuido removeremos o mapa atribuido
  // e recriamos outro.
  else {
    map.remove();
    map = L.map("mapid").setView(
      [pos.coords.latitude, pos.coords.longitude],
      16
    );
  }
  // Função tileLayer utiliza uma API para renderizar as ruas e partes do mapa
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // attribution sendo utilizado para das os créditos a API, por ser uma API gratis ela cobra apenas os
    // devidos créditos
  }).addTo(map);
  // Para adicionar a figurinha de marcação no mapa
  L.marker([pos.coords.latitude, pos.coords.longitude])
    .addTo(map)
    .bindPopup("Você está aqui!")
    .openPopup();
}

function error(err) {
  console.log(err);
}

var olhaminhaLoc = navigator.geolocation.watchPosition(success, error, {
  enableHighAccuracy: true,
  timeout: 5000,
});
