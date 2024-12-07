import { errorHandler } from "./error.js";

export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is authenticated and an admin
    } else {
        return next(errorHandler(403, 'Admin access only'));
    }
};
