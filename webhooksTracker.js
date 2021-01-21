const EventEmitter = require('events');
const childProcess = require('child_process');
const { join } = require('path');

module.exports = class WebhooksTracker extends EventEmitter {
    constructor({port,webhookPath, responseCode }){
        super();
        this.eventType="webhook";
        this.events=[this.eventType];

        this.port=port;
        this.webhookPath=webhookPath ||'/hooks';
        this.responseCode= responseCode || 200;
    }

    async instrument(page) {
          
        var cp = childProcess.fork(join(__dirname, 'webhooksListener.js'),[this.port,this.responseCode,this.webhookPath]);
        
        cp.on('message',  (message)=> {
            this.report(`Arrived @ ${new Date() } \r\n Body: ${message}`);
        });

        cp.on('spawn', function (message) {
            console.log('Started' + message);
   
        });
        process.on('exit', function () {
            cp.kill();
        });

    }

    report(data) {

        const eventData = {
            eventType: this.eventType,
            eventData: {
                title: 'Webhook',
                message: data
            }
        };
        this.emit(this.eventType,JSON.stringify(eventData))
    }
}