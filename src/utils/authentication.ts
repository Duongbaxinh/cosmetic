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

export const authorization = (role: string, scopeString: string) => {
  if (role && scopeString) {
    const scopeList = scopeString.split(" ");
    const authList = role.split(" ");
    return authList.some((auth) => scopeList.includes(auth));
  }
};
