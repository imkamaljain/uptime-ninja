import toast from "react-hot-toast";
import api from "./axios";

export async function getAllMonitors() {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor`,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}

export async function saveMonitor(payload: any) {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor`,
      payload,
    );
    toast.success("Monitor added successfully!");
    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}

export async function updateMonitor(id: any, payload: any) {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor/${id}`,
      payload,
    );
    toast.success("Monitor updated successfully!");
    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}

export async function deleteMonitor(id: any) {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor/${id}`,
    );
    toast.success("Monitor deleted successfully!");
    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}
