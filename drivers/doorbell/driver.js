'use strict';

const Homey = require('homey');

class DoorbellDriver extends Homey.Driver {
    onPairListDevices(data, callback) {
        callback(null, [
            {
                name: 'Doorbell',
                data: {
                    id: 'doorbell'
                }
            }
        ]);
    }
}

module.exports = DoorbellDriver;
