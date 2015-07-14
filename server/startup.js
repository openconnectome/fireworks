Meteor.startup(function() {
    if (!AttrEdges.findOne()) {
        _seed();
    }
});
