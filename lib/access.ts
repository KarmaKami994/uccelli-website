import type { Access, FieldAccess } from "payload";

/** Public read access — required for the website (and media files) to be visible to anonymous visitors. */
export const anyone: Access = () => true;

/** Any logged-in CMS user (admin or editor). */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Admins only. */
export const adminOnly: Access = ({ req }) => req.user?.role === "admin";

/** Admins, or the user acting on their own document (for profile self-service). */
export const adminOrSelf: Access = ({ req, id }) => {
  if (req.user?.role === "admin") return true;
  return Boolean(req.user && id && String(req.user.id) === String(id));
};

/** Field-level: only admins may set/change this field (e.g. `role`). */
export const adminOnlyField: FieldAccess = ({ req }) => req.user?.role === "admin";

/**
 * Standard access for public website content:
 * everyone can read, only logged-in users can write.
 */
export const contentAccess = {
  read: anyone,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
};
