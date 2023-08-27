import axios from "axios";

const getRequest = async (url: string, token: string) => {
  const res = await axios({
    method: "Get",
    url: url,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const createRequest = async ({
  url,
  token,
  payload,
}: {
  url: string;
  token: string;
  payload: any;
}) => {
  const { data } = await axios({
    url: url,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });

  return data;
};

const updateRequest = async ({
  url,
  token,
  payload,
}: {
  url: string;
  token: string;
  payload: any;
}) => {
  const { data } = await axios({
    url: url,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });

  return data;
};

const deleteRequest = async ({
  url,
  token,
}: {
  url: string;
  token: string;
}) => {
  const { data } = await axios({
    url: url,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { getRequest, createRequest, updateRequest, deleteRequest };
