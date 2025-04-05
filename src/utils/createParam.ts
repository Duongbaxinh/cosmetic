export const createParams = (customParams: any) => ({
  limit: 10,
  page: 0,
  ...customParams,
});
