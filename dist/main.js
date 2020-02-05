$('#submitBtn').on('click', function() {
    const input = $('#teamNameInput').val()

    $.get(`/teams/${input}`, function(result) {
        renderer.render(result) 
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