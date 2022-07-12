import {Logger} from './logger.js';

/**
 * Message parser and verifier
 */
export class Parser {
    /**
     * Parses a message and ensures it has an object_id and data
     * @param {string} source caller source for logging
     * @param {object} message message to parse
     * @return {object} parsed message, undefined if failure
     */
    static parse(source, message) {
        if (!message) {
            console.warn(source, 'Received empty message');
            return undefined;
        }

        const object_id = message.object_id;
        if (object_id === undefined) {
            console.error(source, 'Malformed message (no object_id):', JSON.stringify(message));
            return undefined;
        }

        const data = message.data;
        if (data === undefined) {
            console.error(source, 'Malformed message (no data field):', JSON.stringify(message));
            return undefined;
        }

        return {
            object_id: object_id,
            data: data,
        };
    }
}
