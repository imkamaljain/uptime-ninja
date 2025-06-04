import api from "./axios";

export async function getAllIncidents() {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/incident`,
    );
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
