'use strict';

const Homey = require('homey');

let doorbell = new Homey.Signal433('doorbell');
let buttonPressedTrigger = new Homey.FlowCardTrigger('button_pressed');

let pressed = false;

doorbell.register().then(() => {
    doorbell.on('payload', function(payload, first) {
        // console.log('received from a device:', payload, 'isRepetition:', !first);

        if (first && !pressed) {
            pressed = true;
            setTimeout(() => {
                pressed = false;
            }, 3000);

            buttonPressedTrigger.register().trigger().catch(this.error);
        }
    });
}).catch(this.error);

class DoorbellApp extends Homey.App {
    onInit() {
        this.log('Doorbell is running...');
    }
}

module.exports = DoorbellApp;
