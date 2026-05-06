export const isAdminAuthorized = (req) => {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    return true;
  }

  const incomingKey = req.headers["x-admin-key"];
  return incomingKey === configuredKey;
};
