// Função para carregar o arquivo XML
function loadXML() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      displayData(this);
    }
  };
  xhttp.open("GET", "../src/fitmatch.xml", true);
  xhttp.send();
}

// Função para exibir os dados da academia
function displayData(xml) {
  var xmlDoc = xml.responseXML;

  // Obter os elementos do XML
  var name = xmlDoc.querySelector("academia > nome").textContent;
  var address = xmlDoc.querySelector("academia > endereco");
  var street = address.querySelector("rua").textContent;
  var city = address.querySelector("cidade").textContent;
  var state = address.querySelector("estado").textContent;
  var zip = address.querySelector("cep").textContent;
  var schedule = xmlDoc.querySelectorAll("horario");
  var services = xmlDoc.querySelectorAll("servico");

  // Exibir os dados da academia
  var gymInfo = document.getElementById("gym-info");
  gymInfo.innerHTML =
    "<p><strong>Nome:</strong> " +
    name +
    "</p>" +
    "<p><strong>Endereço:</strong> " +
    street +
    ", " +
    city +
    ", " +
    state +
    " " +
    zip +
    "</p>";

  // Exibir os horários de funcionamento
  var scheduleTable = document.getElementById("schedule-table");
  schedule.forEach(function (item) {
    var day = item.getAttribute("dia");
    var time = item.textContent;
    var row = scheduleTable.insertRow();
    var dayCell = row.insertCell(0);
    var timeCell = row.insertCell(1);
    dayCell.innerHTML = day;
    timeCell.innerHTML = time;
  });

  // Exibir os serviços
  var servicesList = document.getElementById("services-list");
  services.forEach(function (item) {
    var serviceName = item.querySelector("nome").textContent;
    var serviceDescription = item.querySelector("descricao").textContent;
    var listItem = document.createElement("li");
    listItem.innerHTML =
      "<strong>" + serviceName + ":</strong> " + serviceDescription;
    servicesList.appendChild(listItem);
  });
}
