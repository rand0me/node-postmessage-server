export default class Response {

    /**
     * @param id {string} Response Id
     * @returns {Request}
     */
    setId(id) {
        this.id = id;
        return this;
    }

    /**
     * @param source {object} Response source
     * @returns {Request}
     */
    setSource(source) {
        this.source = source;
        return this;
    }

    /**
     * @param dest {{postMessage} Response destination
     * @returns {Request}
     */
    setDestination(dest) {
        this.dest = dest;
        return this;
    }

    /**
     * @param data {object} Response data
     * @returns {Request}
     */
    setData(data) {
        this.data = data;
        return this;
    }

    /**
     * send Response
     * @param [data] {object} Data to send
     */
    send(data) {
        if (data) {
            this.data = extend(this.data, data);
            this.dest.postMessage(JSON.stringify(this.data), '*');
            return this;
        }

        if (this.data) {
            this.dest.postMessage(JSON.stringify(this.data), '*');
            return this;
        }

        this.dest.postMessage(JSON.stringify(this), '*');
        return this;
    }
}

/**
 * Response factory method
 * @param req {Request} onMessage Event object
 * @param [data] {object} Optional Response data
 * @returns {Response}
 */
Response.fromRequest = (req, data) => {
    const res = new Response();
    const _data = { path: res.path, type: 'RESPONSE' };
    res.setDestination(req.source);

    if (data) {
        res
            .setId(req.id)
            .setData(extend(_data, data));
    }

    return res;
};

function extend(_o1, _o2) {
    let o1 = _o1 || {}
      , keys = Object.keys(_o2)
      , key
      ;

    while (key = keys.pop()) o1[key] = _o2[key];

    return o1;
}