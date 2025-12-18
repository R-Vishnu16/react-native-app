// services/apiService.ts
export type Candidate = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: {
    name: string;
  };
  role: string;
};

const BASE_URL = "https://dummyjson.com";

export async function fetchCandidates(): Promise<Candidate[]> {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    
    const candidates: Candidate[] = data.users.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      image: u.image,
      company: { name: u.company.name },
      role: u.role,
    }));

    return candidates;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
