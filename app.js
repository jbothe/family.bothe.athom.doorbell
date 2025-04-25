'use strict';

const BUTTON_PRESSED_DATA = 3583698

const Homey = require('homey');
const { RFUtil } = require('homey-rfdriver');

let pressed = false;

class DoorbellApp extends Homey.App {
  async onInit() {
    this.log('Doorbell is running...');

    const buttonPressedTrigger = this.homey.flow.getTriggerCard('button_pressed');
    const doorbellSignal = this.homey.rf.getSignal433('doorbell');

    await doorbellSignal.enableRX();

    doorbellSignal.on("payload", async function (payload, first) {
      //console.log('Received from a device:', payload.join(''), 'isRepetition:', !first, 'data (number):', RFUtil.bitArrayToNumber(payload));
      if (first && !pressed && RFUtil.bitArrayToNumber(payload) == BUTTON_PRESSED_DATA) {
          pressed = true;
          setTimeout(() => {
              pressed = false;
          }, 3000);

          await buttonPressedTrigger.trigger();
      }
    });
  }
}

module.exports = DoorbellApp;
