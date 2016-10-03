export default class Response {

    /**
     * @param id {string} Response Id
     * @returns {Response}
     */
    setId(id) {
        this.id = id;
        return this;
    }

    /**
     * @param source {object} Response source
     * @returns {Response}
     */
    setSource(source) {
        this.source = source;
        return this;
    }

    /**
     * @param dest {{postMessage}} Response destination
     * @returns {Response}
     */
    setDestination(dest) {
        this.dest = dest;
        return this;
    }

    /**
     * @param data {object} Response data
     * @returns {Response}
     */
    setData(data) {
        this.data = data;
        return this;
    }

    /**
     * send Response
     * @param [data] {object} Data to send
     * @returns {Response}
     */
    send(data) {
        this.data = extend(this.data, data);
        this.dest.postMessage(JSON.stringify(this.data), '*');

        return this;
    }
}

/**
 * Response factory method
 * @param _req {Request} onMessage Event object
 * @param [_data] {object} Optional Response data
 * @returns {Response}
 */
Response.fromRequest = (_req, _data) => {
    if (!_req) {
        return null;
    }

    const res = new Response();
    const req = _req;
    const data = { path: res.path, type: 'RESPONSE' };

    res
        .setDestination(req.source)
        .setId(req.id)
        .setData(extend(data, _data));

    return res;
};

function extend(_o1, _o2) {
    let o1 = _o1 || {}
      , keys = Object.keys(_o2 || {})
      , key
      ;

    while (key = keys.pop()) o1[key] = _o2[key];

    return o1;
}