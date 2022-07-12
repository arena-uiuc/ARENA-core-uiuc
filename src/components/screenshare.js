/* global AFRAME */

/**
 * @fileoverview Screen share System to keep track of all screenshareable objects.
 *
 */

/**
 * Screenshare-able Component. Allows an object to be screenshared upon
 * @module screenshareable
 *
 */
AFRAME.registerComponent('screenshareable', {
    schema: {

    },

    init: function() {
        this.update();
    },

    update: function(oldData) {
        const register = this.data;
        const prevRegistered = oldData;

        if (register) {
            this.register();
        } else if (prevRegistered) {
            this.remove();
        }
    },

    register: function() {
        this.system.registerComponent(this);
    },

    remove: function() {
        this.system.unregisterComponent(this);
    },
});
