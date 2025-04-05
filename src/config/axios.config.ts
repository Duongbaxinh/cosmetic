import axios from "axios";

const instance = (authenticated?: any) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    // headers: authenticated,
  });

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Modify the response before it's returned to the caller
      console.log("Response Data:", response.data);
      // For example, you can format or extract specific data here
      const formattedData =
        response.data && response.data.results
          ? response.data.results
          : response.data;
      return formattedData; // Returning the formatted data
    },
    (error) => {
      // Handle any errors globally (optional)
      console.error(
        "Response Error:",
        error.response ? error.response.data : error.message
      );
      // You can throw the error again or return a custom error response
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default instance;
