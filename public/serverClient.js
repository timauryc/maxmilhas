$(document).ready(function () {
    console.log("hey, im the status client :)")
    getServerStatus()
});

function getServerStatus() {
    $.get(`/server/status`, function (data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        displayServerInfo(data)
    });
}

function displayServerInfo(serverInfo) {
    $("#uptime-time").text(serverInfo.uptime + " seg")
    $("#total-queries").text(serverInfo.queriesCount)
    $("#total-blacklisted").text(serverInfo.totalBlacklistedCPFs)
}