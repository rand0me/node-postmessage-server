import tape from 'tape';

import Server from '../src';
import WindowMock from './window.mock';

const TEST_DATA = {
    message: "OK"
  , type: 'RESPONSE'
};

const TEST_ROUTES = [
    {path: 'test/route', handler: (req, res) => res.send(TEST_DATA)},
    {path: 'test/script-error', handler: (req, res) => res.notAFunction()}
];

tape('api', (t) => {
    const hostWindow = new WindowMock();
    const targetWindow = hostWindow;

    t.plan(3);

    targetWindow.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        if (data.type !== 'RESPONSE') return;
        if (data.error) {
            t.pass(data.error.message);
        } else {
            t.deepEqual(data, TEST_DATA, `Received response: ${data.message}`);
        }
    });

    const pmServer = Server.create(TEST_ROUTES);
    pmServer.listen(hostWindow);

    hostWindow.postMessage(JSON.stringify({path: "test/route"}), targetWindow, false);
    hostWindow.postMessage(JSON.stringify({path: "test/non-existent-route"}), targetWindow, false);
    hostWindow.postMessage(JSON.stringify({path: "test/script-error"}), targetWindow, false);
});