import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./token.service";

const BASE_URL = process.env.VITE_API;

export const postData = async ({ url, body }) => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}${url}`, body);

    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
export const postDataMutation = (key) => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClinet.invalidateQueries([key]);
    },
  });
};

//
export const postRefech = async ({ url }) => {
  try {
    const res = await axiosInstance.post(
      `${BASE_URL}${url}`,
      {},
      {
        headers: {
          Authorization: `Bearer, ${JSON.parse(
            localStorage.getItem(`access_token`)
          )}`,
        },
      }
    );

    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//
export const postRefchMutation = (key) => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClinet.invalidateQueries([key]);
    },
  });
};
