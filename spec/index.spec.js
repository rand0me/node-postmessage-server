import tape from 'tape';

import Server from '../src';

tape('babel test', (t) => {
    let server = new Server();
    t.ok(server.prop, 'Test passed');
    t.end();
});