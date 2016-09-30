import Router from './Router';
import Request from './Request';
import Response from './Response';

/**
 * Server
 */
export default class Server {
    constructor() {
    }

    /**
     * Set a window property
     * @param window {{postMessage},{addEventListener}} Window object with postMessage and addEventListener methods
     * @private
     */
    setWindow(window) {
        if ( ! window.postMessage ) {
            throw Error('window does not have postMessage method');
        }

        this.window = window;
        return this;
    }

    /**
     * Set a router property
     * @param router {Router}
     * @private
     */
    setRouter(router) {
        if ( ! router instanceof Router ) {
            throw Error('router must be an instance of Router');
        }

        this.router = router;
        return this;
    }

    /**
     * Add an eventListener to Window object
     * @param window {{postMessage},{addEventListener}}
     */
    listen(window) {
        this.setWindow(window);
        this.window.addEventListener('message', this.handle.bind(this), false);
    }

    /**
     * Handle message events
     * @param event {event}
     * @private
     */
    handle(event) {
        const req = Request.fromMessageEvent(event);
        const res = Response.fromRequest(req);

        try {
            this.router.process(req, res);
        } catch (error) {
            res.send({ error: { message: error.toString() } });
        }
    }
}

/**
 * Creator pattern implementation
 * @param routes
 * @returns {Server}
 */
Server.create = (routes) => {
    let server = new Server();

    if (routes) {
        return server.setRouter(Router.fromArray(routes));
    } else {
        return server.setRouter(new Router());
    }
};