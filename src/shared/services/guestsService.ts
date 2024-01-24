import axios from "axios";
import { getToken } from "@/shared/functions/getToken";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getGuests = async (params?: {
  p: number;
  pp: number;
  search?: string;
}) => {
  const body = params || {
    p: 1,
    pp: 10,
  };

  const response = await serverApi.get("/guests", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: body,
  });
  return response.data;
};

export const getTotalCount = async (search?: string, filter?: string) => {
  let config: any = search ? { params: { search: search } } : undefined;

  if (config && filter) {
    config = {
      params: { search: search, filter: filter },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  } else if (!config && filter) {
    config = {
      params: { filter: filter },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  } else if (config && !filter) {
    config = {
      params: { search: search },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  } else {
    config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  }

  console.log(config);

  const response = await serverApi.get("/guests/total-count", config);
  return response.data;
};

export const createGuest = async (body: any) => {
  body = Object.assign({ ...body, assist: false, saw_invitation: false });
  if (!body.table || !body.table.length) {
    delete body.table;
  }
  if (!body.group || !body.group.length) {
    delete body.group;
  }
  const response = await serverApi.post("/guests", body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const updateGuest = async (id: string, body: any) => {
  body = Object.assign({ ...body, assist: false, saw_invitation: false });
  if (!body.table || !body.table.length) {
    delete body.table;
  }
  if (!body.group || !body.group.length) {
    delete body.group;
  }
  const response = await serverApi.put(`/guests/${id}`, body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const deleteGuest = async (id: string) => {
  const response = await serverApi.delete(`/guests/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

// export const sendWhatsApp = async () => {
//   const response = await serverApi.post("/guests/send", undefined, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });
//   return response.data;
// };
