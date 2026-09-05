/**
 * Paths reachable without a token. Everything else the gateway serves requires a
 * valid JWT — the check is fail-closed, so a newly added service route is
 * protected unless it is listed here on purpose.
 *
 * Matched as prefixes against the request path (query string excluded).
 */
export const publicPaths: string[] = [
    '/api/v1/auth/login',
    '/api/v1/auth/password-reset',
    '/api/v1/auth/invite',
    '/health',
];

export function isPublicPath(pathname: string): boolean {
    return publicPaths.some(
        (publicPath) =>
            pathname === publicPath || pathname.startsWith(`${publicPath}/`),
    );
}
