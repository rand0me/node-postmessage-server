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
            this.dest.postMessage(JSON.stringify(data));
            return this;
        }

        if (this.data) {
            this.dest.postMessage(JSON.stringify(this.data));
            return this;
        }

        this.dest.postMessage(JSON.stringify(this));
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
    res.setDestination(req.source);

    if (data) {
        res.setId(req.id)
            .setData(data);
    }

    return res;
};