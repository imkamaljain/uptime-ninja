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
