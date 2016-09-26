import test from 'tape';

import Router from '../src/lib/Router';

const TEST_ARRAY = [
    { name: 'inhabit/styles', handler: (req, res) => res.send('OK: ' + req.data.id) }
];

test('Router', (t) => {
    const router = Router.fromArray(TEST_ARRAY);
    t.ok(router);
    t.end();
});