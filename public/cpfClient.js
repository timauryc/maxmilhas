$(document).ready(function () {
    console.log("hey, im ready :)")

    const unknownError = "Ops, parece ter acontecido um error com o servidor, por favor, tente novamente"

    $("#cpf-input").mask('000.000.000-00', { reverse: true });

    $(".button").click(function () {
        console.log(this.id); // or alert($(this).attr('id'));
        let inputData = getValidInput()
        if (inputData) {
            switch (this.id) {
                case "consult-btn":
                    consultCPF(inputData)
                    break;
                case "insert-btn":
                    insertCPF(inputData)
                    break;
                case "delete-btn":
                    deleteCPF(inputData)
                    break;
                case "modify-btn":
                    modifyCPF(inputData)
                    break;
                default:
                    console.log("I should not be here, anyways...42 is the answer")
            }
        } else {
            displayResult("Cpf invalido")
        }
    });

    function displayResult(result) {
        $("#operations-display").text(JSON.stringify(result))
    }

    function getValidInput() {
        let cpfNumber = $("#cpf-input").val()
        if (cpfNumber.match(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/)) {
            return {
                cpfNumber: cpfNumber,
                cpfStatus: $('#cpf-status :selected').text()
            }
        } else {
            return null
        }
    }

    function consultCPF(inputData) {
        $.get(`/cpf/${inputData.cpfNumber}/estado`, function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            if (status != "success") {
                displayResult(unknownError)
            } else if (!data) {
                displayResult("cpf não registrado")
            } else {
                try {
                    displayResult(`O cpf ${data._id} se encontra em estado ${data.status}`)
                } catch (error) {
                    console.log(error)
                    displayResult(unknownError)
                }
            }
        });
    }

    function insertCPF(inputData) {
        $.post('/cpf', { _id: inputData.cpfNumber, status: inputData.cpfStatus }, function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            displayResult("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        });
    }

    function deleteCPF(inputData) {
        $.ajax({
            url: `/cpf/${inputData.cpfNumber}`,
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
    }

    function modifyCPF(inputData) {
        $.ajax({
            url: `/cpf/estado`,
            type: 'PATCH',
            data: JSON.stringify({ "_id": inputData.cpfNumber, "status": inputData.cpfStatus }),
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
    }
});

