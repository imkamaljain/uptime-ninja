import toast from "react-hot-toast";
import api from "./axios";

export async function getUser() {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}

export async function updateUser(payload: any) {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      payload,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}

export async function deleteUser() {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}
