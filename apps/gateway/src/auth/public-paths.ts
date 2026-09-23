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
    // Read-only, and reached before the learner has a session.
    '/api/v1/tc-versions/current',
    '/health',
];

export function isPublicPath(
    pathname: string,
    method: string,
): boolean {
    const isExistingPublicPath = publicPaths.some(
        (publicPath) =>
            pathname === publicPath ||
            pathname.startsWith(`${publicPath}/`),
    );

    if (isExistingPublicPath) {
        return true;
    }

    return (
        method === 'GET' &&
        pathname.startsWith('/api/v1/tokens/') &&
        pathname.endsWith('/validate')
    );
}
