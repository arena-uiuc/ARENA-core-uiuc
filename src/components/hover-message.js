/* global AFRAME, ARENA */
/**
 * @fileoverview Hover message component, show message on mouse enter.
 *
 * Author: Bohan Liu (bohan3@illinois.edu)
 * @date 2022
 */




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
            console.log("enter");
        });
        el.addEventListener("mouseleave", function(evt) {
            console.log("leave");
        })
    }

});