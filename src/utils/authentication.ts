// export const authentication = (
//   authentication: string,
//   scope: string
// ): boolean => {
//   const scopes = scope.split(authentication);
//   if (scopes.includes(scope)) {
//     return true;
//   }
//   return false;
// };

export const authorization = (role: string) => {
  const scopeString = JSON.parse(localStorage.getItem("scope") || "");
  const scopeList = scopeString.split(" ");
  const authList = role.split(" ");
  return authList.some((auth) => scopeList.includes(auth));
};
