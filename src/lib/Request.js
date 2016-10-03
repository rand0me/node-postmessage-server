
export default class Request {

    /**
     * @param id {string} Request Id
     * @returns {Request}
     */
    setId(id) {
        this.id = id;
        return this;
    }

    /**
     * @param source {object} Request source
     * @returns {Request}
     */
    setSource(source) {
        this.source = source;
        return this;
    }

    /**
     * @param path {string} Request path
     * @returns {Request}
     */
    setPath(path) {
        this.path = path;
        return this;
    }

    /**
     * @param data {object} Request data
     * @returns {Request}
     */
    setData(data) {
        this.data = data;
        return this;
    }
}

/**
 * Request factory method
 * @param event {{data},{id},{source}} onMessage Event object
 * @returns {Request}
 */
Request.fromMessageEvent = (event) => {
    const req = new Request();
    let data;

    try {
        data = JSON.parse(event.data);
    } catch (e) {
        data = {};
    }

    if (data.type === 'RESPONSE') {
        return null;
    }

    return req.setId(data.id)
        .setSource(event.source)
        .setPath(data.path)
        .setData(data);
};