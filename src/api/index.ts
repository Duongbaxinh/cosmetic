import instance from "../config/axios.config";

export const getData = async (url: string, authenticated?: any) => {
  try {
    return await instance(authenticated).get(url, authenticated);
  } catch (error) {
    return error;
  }
};

export const postData = async (
  url: string,
  payload: any,
  authenticated: any
) => {
  try {
    const response = await instance(authenticated).post(
      url,
      payload,
      authenticated
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const putData = async (
  url: string,
  payload: any,
  authenticated: any
) => {
  try {
    const response = await instance(authenticated).put(
      url,
      payload,
      authenticated
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteData = async (url: string, authenticated: any) => {
  try {
    const response = await instance(authenticated).delete(url, authenticated);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteMany = async (
  url: string,
  payload: any,
  authenticated: any
) => {
  try {
    const response = await instance(authenticated).post(
      url,
      payload,
      authenticated
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteAll = async (url: string, authenticated: any) => {
  try {
    const response = await instance(authenticated).delete(url, authenticated);
    return response.data;
  } catch (error) {
    return error;
  }
};
