import api from "@/utils/axios-instance";

export async function signInUser(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/sign-in", { email, password });

    return {
      id: data.user.id,
      email: data.user.email,
      name: `${data.user.firstName} ${data.user.lastName}`,
      role: data.user.role,
      group: data.user.group,
      token: data.token,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
