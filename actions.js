var sys = require('sys'),
    exec = require('child_process').exec;

module.exports = {
    /**
     * Toggle the screen saver.
     * @param  {Object} req The request object
     * @param  {Object} res The response object
     */
    screensaver: function(req, res) {
        exec("caffeinate -u -t 1", function(err, stdout, sterr) {
            exec("osascript -l AppleScript actions/toggle_screen_saver.scpt");
        }.bind(this));

        return true;
    },

    /**
     * Open applications commonly used during work hours
     * @param  {Object} req The request object
     * @param  {Object} res The response object
     */
    launch: function(req, res) {
        exec("osascript -l AppleScript actions/launch_work_apps.scpt");
        return true;
    },

    kevin: function(req, res) {
		exec('say "Kevin!"');
		return true;
    }
};