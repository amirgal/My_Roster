$('#submitBtn').on('click', function() {
    const input = $('#teamNameInput').val()

    $.get(`/teams/${input}`, function(result) {
        result.forEach(player => {
            $('#results').append(`<img src="${player.img}">`)
            $('#results').append(`<div>Player Name: ${player.firstName} ${player.lastName} Player Position: ${player.position} Player Jersey Number: ${player.jerseyNum}`)
        });
    })
})