export const handleAxiosError = (error: any) => {
  if (error.response) {
    console.error("Error Response:", error.response.data);
    return error.response.data;
  } else if (error.request) {
    console.error("No Response:", error.request);
    return error.request;
  } else {
    console.error("Request Error:", error.msg);
    return error.msg;
  }
};
