const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(() => {
    getPlanet(urlParams.planet);

    $('#btnAddPortal').click(() => {
        addPortal();
    });
});

function addPortal() {
    const position = $('#txtPosition').val();
    const affinity = $('#cboAffinity').val();
}

async function getPlanet(url) {
    const response = await axios.get(url);

    if (response.status === 200) {
        const planet = response.data;

        $('#imgIcon').attr('src', planet.icon);
        $('#lblName').html(planet.name);
        $('#lblDiscoveredBy').html(planet.discoveredBy);
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        const position =  `(${planet.position.x.toFixed(3)} ;  ${planet.position.y.toFixed(3)} ; ${planet.position.z.toFixed(3)})`
        $('#lblPosition').html(position);
        $('#lblPositionY').html(planet.position.y.toFixed(3));
        $('#lblPositionZ').html(planet.position.z.toFixed(3));

        //Satellites
        let satellitesHtml = '';
        planet.satellites.forEach(s => {
            satellitesHtml += `<li>${s}</li>`;
        });

        if (satellitesHtml === '')
            satellitesHtml += `Aucun satellite`;

        $('#satellites').html(satellitesHtml);

        displayPortal(planet.portals);

    }
}

function displayPortal(portals) {
    let portalsHtml = '';

    portals.forEach(p => {
        portalsHtml += '<tr>';
        portalsHtml += `<td>${p.position}</td>`;
        portalsHtml += `<td><img src="img/${p.affinity}.png" title="${p.affinity}"/></td>`
        portalsHtml += '</tr>';

    });
        
    $('#portals tbody').html(portalsHtml);
}