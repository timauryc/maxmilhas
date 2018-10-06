$(document).ready(function () {
    console.log("hey, im ready :)")

    const unknownError = "Ops, parece ter acontecido um error com o servidor, por favor, tente novamente"

    let dictionary = {
        unknownError: "Ops, parece ter acontecido um error com o servidor, por favor, tente novamente",
        cpfInvalid :  "Cpf invalido",
        cpfNotRegistered : "Cpf não registrado",
        cpfDeleteSuccess : "Cpf apagado com sucesso",
        cpfUpdateSuccess : "Cpf modificado com sucesso",
        cpfAlreadyRegistered : "Parece ser que esse cpf ja foi inserido previamente."
    }


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
            displayResult(dictionary.cpfInvalid)
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
                displayResult(dictionary.unknownError)
            } else if (!data) {
                displayResult(dictionary.cpfNotRegistered)
            } else {
                try {
                    displayResult(`O cpf ${data._id} se encontra em estado ${data.status}`)
                } catch (error) {
                    console.log(error)
                    displayResult(dictionary.unknownError)
                }
            }
        });
    }

    function insertCPF(inputData) {
        $.ajax({
            url: `/cpf`,
            type: 'POST',
            data: JSON.stringify({ "_id": inputData.cpfNumber, "status": inputData.cpfStatus }),
            contentType: 'application/json',
            processData: false,
            dataType: 'json',
            success: function (result) {
                console.log("Data: " + JSON.stringify(result));
                displayResult(`o cfp ${result._id} com status ${result.status} foi inserido com sucesso`);
            },
            error: function (errorObject, textStatus, errorThrown) {
                if (errorObject.status == 409) {
                    displayResult(dictionary.cpfAlreadyRegistered);
                } else {
                    displayResult(dictionary.unknownError)
                }
            }
        });
    }

    function deleteCPF(inputData) {
        $.ajax({
            url: `/cpf/${inputData.cpfNumber}`,
            type: 'DELETE',
            success: function (result) {
                console.log("Data: " + JSON.stringify(result));
                if (result.totalDeleted) {
                    displayResult(dictionary.cpfDeleteSuccess)
                } else {
                    displayResult(dictionary.cpfNotRegistered)
                }
            },
            error: function (data) {
                displayResult(dictionary.unknownError)
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
                if (result.totalReplaced) {
                    displayResult(dictionary.cpfUpdateSuccess)
                } else {
                    displayResult(dictionary.cpfNotRegistered)
                }
            },
            error: function (data) {
                console.log('Error:', data);
                displayResult(dictionary.unknownError)
            }
        });
    }
});

