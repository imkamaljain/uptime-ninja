import api from "./axios";

export async function getAllMonitors() {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor`,
    );
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}

export async function saveMonitor(payload: any) {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor`,
      payload,
    );
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}

export async function updateMonitor(id: any, payload: any) {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor/${id}`,
      payload,
    );
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}

export async function deleteMonitor(id: any) {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/monitor/${id}`,
    );
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
