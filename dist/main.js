$('#submitBtn').on('click', () => {
    const input = $('#teamNameInput').val()

    $.get(`/teams/${input}`, function(result) {
        renderer.render(result) 
    })
})

$('#dreamTeamBtn').on('click', () => {
    $.get('/dreamTeam', (result) => {
        renderer.render(result)
    })
})

$('#container').on('click','.player', function() {
    const name = $(this).find('#name').text().split(' ')
    const player = {
        firstName: name[0],
        lastName: name[1],
        img: $(this).find('img').attr('src'),
        position: $(this).find('#position').text()
    }
    $.post(`/roster`, player)
})

class Renderer {
    render(data) {
        const source = $("#player-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({player: data});
        $('#container').empty();
        $('#container').append(newHTML);
    }
}
const renderer = new Renderer
