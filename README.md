# testimony-webhooks-tracker
Webhook listener for Testimony

Starts up a express server in child process and listens for webhooks
Reports the message body to session reporter


## Sample
```js
const { chromium } = require('playwright');
const TestSession =require('testimony-playwright/testSession');
const ConsoleTracker = require('testimony-playwright/trackers/consoleTracker');
const ClickTracker = require('testimony-playwright/trackers/clickTracker');
const ScreenshotTracker = require('testimony-playwright/trackers/screenshotTracker');
const args = process.argv.slice(2);

const WebhooksTracker= require('./webhooksTracker');


(async () => {
const sessionTitle=args[0]|| `session-${new Date().toISOString()}`;

const browser = await chromium.launch({ headless: false, slowMo: 50 });

const testSession= new TestSession({sessionTitle});

testSession.track(new ClickTracker());
testSession.track(new ScreenshotTracker());
testSession.track(new WebhooksTracker({
    port: 3005
}));

const initialUrl=`https://www.google.com`;
await testSession.start(browser,initialUrl);
})();

```


