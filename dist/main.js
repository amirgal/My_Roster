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

$('#container').on('click','#add-btn', function() {
    const playerContainer = $(this).closest('.player')
    const name = playerContainer.find('#name').text().split(' ')
    const player = {
        firstName: name[0],
        lastName: name[1],
        jerseyNum: playerContainer.find('#jerseyNum').text(),
        img: playerContainer.find('img').attr('src'),
        position: playerContainer.find('#position').text(),
        addBtn: 'Add to Dream Team',
        delBtn: 'Delete from DreamTeam',
        playerId: playerContainer.data().id
    }
    $.post(`/roster`, player)
})

$('#container').on('click','#del-btn', function() {
    const playerContainer = $(this).closest('.player')
    const playerId = playerContainer.data().id
    $.ajax({
        url:`/roster/${playerId}`,
        type: 'DELETE',
        success: function() {
            $.get('/dreamTeam', (result) => {
                renderer.render(result)
            })
        }
    })
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
