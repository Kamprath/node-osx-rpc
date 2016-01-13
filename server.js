var express = require('express'),
    actions = require('./actions.js');

var Server = {
    server: null,
    port: 8000,

    /**
     * Initialize the server
     */
    init: function() {
        this.server = express();
        this.server.listen(this.port);

        this.registerRoutes();

        console.log('Listening on port {port}...'.replace('{port}', this.port));
    },

    /**
     * Register server routes
     */
    registerRoutes: function() {
        this.server.get('/:action', this.handleRequest.bind(this));
    },

    /**
     * Call action and send response
     * @param req  The request object
     * @param res  The response response object
     */
    handleRequest: function (req, res) {
        var status, message;
        var action = req.params.action;

        if (actions.hasOwnProperty(action)) {
            var success = actions[action](req, res);
            status = (success) ? 200 : 400;
            message = '"' + action + '" triggered.'; 
        } else {
            status = 404;
            message = 'Action "' + action + '" attempted.';
        }

        res.statusCode = status || 500;
        res.send();

        this.log(message);
    },

    log: function(message) {
        var date = new Date();
        console.log('[' + date.getHours() + ':' + date.getMinutes() + '] ' + message);
    }
};

Server.init();