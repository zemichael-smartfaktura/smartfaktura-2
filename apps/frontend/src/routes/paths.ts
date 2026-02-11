/**
 * Single source of truth for frontend route paths.
 * Use these for <Link to>, navigate(), <Route path>, and <Navigate to>.
 */
export const PATHS = {
  home: "/",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
} as const;

export type PathKey = keyof typeof PATHS;
