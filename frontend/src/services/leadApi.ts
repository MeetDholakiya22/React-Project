
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<ApiUser[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
