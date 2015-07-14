Router.configure({
    'layoutTemplate': 'main'
});

Router.route('/', function () {
    this.render('list', {
        name: 'list'
    });
});

Router.route('show', {
    path: '/show/:filename',
    template: 'show',
    data: function() {
        return {filename: this.params.filename}
    }
});
