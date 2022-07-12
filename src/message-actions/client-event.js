/* global THREE */
import {Logger} from './logger.js';
import {Parser} from './parser.js';

/**
 * Client Event handler
 */
export class ClientEvent {
    /**
     * Client Event handler
     * @param {object} message message to be parsed
     */
    static handle(message) {
        const id = message.id;
        const data = message.data;
        const clicker = data.source;

        // ignore clicks from the camera
        if (clicker === ARENA.camName) {
            return;
        }

        // ignore goto-url and textinput events
        if (message.type === 'goto-url' || message.type === 'textinput') {
            return;
        }

        const entityEl = document.getElementById(id);
        if (!entityEl) {
            Logger.error('clientEvent', `Object with object_id "${id}" does not exist!`);
            return;
        }

        let point = null;
        if (data.position) {
            point = new THREE.Vector3(
                parseFloat(data.position.x),
                parseFloat(data.position.y),
                parseFloat(data.position.z),
            );
        } else {
            Logger.warn('clientEvent', 'Malformed message (no data.position):', JSON.stringify(message));
        }

        switch (message.type) {
        case 'collision':
            // emit a synthetic click event with ugly data syntax
            entityEl.emit('mousedown', {
                'clicker': clicker,
                'intersection': {
                    point: point,
                },
            }, false);
            break;
        case 'mousedown':
            // emit a synthetic click event with ugly data syntax
            entityEl.emit('mousedown', {
                'clicker': clicker,
                'intersection': {
                    point: point,
                },
            }, false);
            break;
        case 'mouseup':
            // emit a synthetic click event with ugly data syntax
            entityEl.emit('mouseup', {
                'clicker': clicker,
                'intersection': {
                    point: point,
                },
            }, false);
            break;
        case 'soundplay':
            if (entityEl.components.sound) {
                entityEl.components.sound.playSound();
            }
            break;
        case 'soundpause':
            if (entityEl.components.sound) {
                entityEl.components.sound.pauseSound();
            }
            break;
        case 'soundstop':
            if (entityEl.components.sound) {
                entityEl.components.sound.stopSound();
            }
            break;
        default: // handle others here like mouseenter / mouseleave
            break;
        }
    }
}
