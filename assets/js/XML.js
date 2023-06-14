// Função para carregar o arquivo XML
function loadXML() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
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
  var academiaElement = xmlDoc.querySelector("academia");
  var nameElement = academiaElement.querySelector("nome");
  var addressElement = academiaElement.querySelector("endereco");
  var streetElement = addressElement.querySelector("rua");
  var cityElement = addressElement.querySelector("cidade");
  var stateElement = addressElement.querySelector("estado");
  var zipElement = addressElement.querySelector("cep");
  var scheduleElements = xmlDoc.querySelectorAll("horario");
  var serviceElements = xmlDoc.querySelectorAll("servico");

  // Obter o texto dos elementos
  var name = nameElement.textContent;
  var street = streetElement.textContent;
  var city = cityElement.textContent;
  var state = stateElement.textContent;
  var zip = zipElement.textContent;

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
  scheduleElements.forEach(function (scheduleElement) {
    var day = scheduleElement.getAttribute("dia");
    var time = scheduleElement.textContent;
    var row = scheduleTable.insertRow();
    var dayCell = row.insertCell(0);
    var timeCell = row.insertCell(1);
    dayCell.textContent = day;
    timeCell.textContent = time;
  });

  // Exibir os serviços
  var servicesList = document.getElementById("services-list");
  serviceElements.forEach(function (serviceElement) {
    var serviceNameElement = serviceElement.querySelector("nome");
    var serviceDescriptionElement = serviceElement.querySelector("descricao");
    var serviceName = serviceNameElement.textContent;
    var serviceDescription = serviceDescriptionElement.textContent;
    var listItem = document.createElement("li");
    listItem.innerHTML =
      "<strong>" + serviceName + ":</strong> " + serviceDescription;
    servicesList.appendChild(listItem);
  });
}
