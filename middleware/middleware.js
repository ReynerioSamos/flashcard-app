//filename: middleware/middleware.js

export const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// middleware to intercept routes, execute whatever they were dong and send them back to homeroute
export const redirectingMiddleware = (routesToRedirect, homeRoute = '/') => {
    return (req, res, next) => {
        if (routesToRedirect.includes(req.path)) {
            console.log(`Redirecting ${req.path} to ${homeRoute}`);
            res.redirect(homeRoute);
        } else {
            next();
        }
    };
};


export const errorHandlingMiddleware = (errorPageRoute = '/error') => (err, req, res, next) => {
    console.error("Error:", err);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode);
    
    console.log(`Redirecting to error page: ${errorPageRoute}`);
    res.redirect(errorPageRoute);
};
