$(document).ready(function () {
    console.log("hey, im ready :)")

    $("#consult-btn").click(function () {
        console.log('test get')
        let cpfNumber = $("#cpf-input").val()
        $.get(`/cpf/${cpfNumber}/estado`, function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            displayResult("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        });
    });

    $("#insert-btn").click(function () {
        console.log('testPost')
        let cpfNumber = $("#cpf-input").val()
        let cpfStatus = $('#cpf-status :selected').text()
        $.post('/cpf', { _id: cpfNumber, status: cpfStatus}, function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            displayResult("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        });
    });

    $("#delete-btn").click(function () {
        console.log('testDelete')
        let cpfNumber = $("#cpf-input").val()
        $.ajax({
            url: `/cpf/${cpfNumber}`,
            type: 'DELETE',
            success: function (result) {
                console.log("Data: " + JSON.stringify(result));
                displayResult("Data: " + JSON.stringify(result));
            },
            error: function (data) {
                console.log('Error:', data);
                displayResult('Error:', data);
            }
        });
    });

    $("#modify-btn").click(function () {
        console.log('testPatch')
        let cpfNumber = $("#cpf-input").val()
        let cpfStatus = $('#cpf-status :selected').text()
        $.ajax({
            url: `/cpf/estado`,
            type: 'PATCH',
            data: JSON.stringify({ "_id": cpfNumber, "status": cpfStatus }),
            contentType: 'application/json',
            processData: false,
            dataType: 'json',
            success: function (result) {
                console.log("Data: " + JSON.stringify(result));
                displayResult("Data: " + JSON.stringify(result));
            },
            error: function (data) {
                console.log('Error:', data);
                displayResult('Error:', data);
            }
        });
    });

    function displayResult(result){
        $("#operations-display").text(JSON.stringify(result))
    }
});

