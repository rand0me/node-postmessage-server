import tape from 'tape';

import Server from '../src';

tape('main', (t) => {
    let server1 = new Server();
    let server2 = Server.create();

    t.ok(server1 instanceof Server, 'Server is a constructor');
    t.ok(server2 instanceof Server, 'Server is a creator');

    t.end();
});