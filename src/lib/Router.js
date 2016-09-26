/**
 * Router
 */
export default class Router {
    constructor() {
        this.routes = [];
        this.handlers = [];
    }

    /**
     * Register router handler
     * @param path {string}
     * @param handler {function}
     * @private
     */
    registerHandler(path, handler) {
        const index = this.routeIndex(path);

        if (!Array.isArray(this.handlers[index])) {
            this.handlers[index] = [];
        }

        this.handlers[index].push(handler);
    }

    /**
     * Get route index
     * @param route {string} Route
     * @returns {number} Route index
     * @private
     */
    routeIndex(route) {
        let index = this.routes.indexOf(route);
        if (index < 0) {
            index = this.routes.push(route) - 1;
        }
        return index;
    }

    /**
     * Process Request with Response
     * @param req {Request}
     * @param res {Response}
     * @throws NoRouteException
     */
    process(req, res) {
        const index = this.routes.indexOf(req.path);

        if (index !== -1) {
            this.invokeHandlers(index, req, res);
        } else {
            throw new NoRouteException(this, req);
        }
    }

    /**
     * Invoke all Route's handlers
     * @param index {number} Route index
     * @param req {Request} Request
     * @param res {Response} Response
     * @private
     */
    invokeHandlers(index, req, res) {
        const handlers = this.handlers[index];

        if (handlers.length > 0) {
            this.handlers[index].forEach((handler) => handler(req, res));
        }
    }
}

/**
 * Router factory
 * @param routes
 * @returns {Router}
 */
Router.fromArray = (routes) => {
    const router = new Router();
    routes.forEach(route => router.registerHandler(route.path, route.handler));

    return router;
};

/**
 * NoRouteException
 */
export class NoRouteException {
    constructor(router, req) {
        this.message = `Route not found. Route: ${req.path}; Routes: ${router.routes.join(', ')}`;
    }

    toString() {
        return this.message;
    }
}