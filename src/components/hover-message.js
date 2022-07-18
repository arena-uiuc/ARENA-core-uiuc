/* global AFRAME, ARENA */
/**
 * @fileoverview Hover message component, show message on mouse enter.
 *
 * Author: Bohan Liu (bohan3@illinois.edu)
 * @date 2022
 */

import { ARENAChat } from "../chat";

var text_id = "unregistered_text";


function putMessage(mes) {

    ARENA.Mqtt.processMessage({
        object_id: text_id,
        action: 'create',
        persist : false,
        type : "object",
        data: {
            object_type : "text",
            position : {x:0, y: 0, z: -2},
            parent: "my-camera",
            font : "roboto",
            value : mes //this.components["hover-message"].data.text
        },
    });
}

/**
 * Hover message component.
 *
 * When applied to an entity, the entity will respond to mouse enter and mouse leave events and show message in scene.
 * 
 * @module hover-message
 * @property {string} text - text to display
 * 
 */

AFRAME.registerComponent("hover-message", {
    schema : {
        text : { type: "string" } ,
    },

    init : function() {
        el = this.el;
        el.addEventListener("mouseenter", function(evt) {
            putMessage(this.components["hover-message"].data.text);
        });
        el.addEventListener("mouseleave", function(evt) {
            camera = document.querySelector("#my-camera");
            camera.removeChild(camera.querySelector("#unregistered_text"));
        });
        

    },
});