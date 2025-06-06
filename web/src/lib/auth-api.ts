import axios from "axios";
import toast from "react-hot-toast";

export async function login(payload: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      payload,
    );
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message);
  }
}
