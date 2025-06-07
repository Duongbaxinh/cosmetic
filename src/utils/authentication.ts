export const authentication = (
  authentication: string,
  scope: string
): boolean => {
  const scopes = scope.split(authentication);
  if (scopes.includes(scope)) {
    return true;
  }
  return false;
};
