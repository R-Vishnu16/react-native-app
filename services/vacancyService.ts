import { Platform } from "react-native";

export type Vacancy = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: string;
  role: string;
};

const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080"; 

export async function fetchVacancies(): Promise<Vacancy[]> {
  try {
    const res = await fetch(`${BASE_URL}/vacancies`);
    if (!res.ok) throw new Error("Failed to fetch vacancies");

    const data = await res.json();

    // map the response directly to Vacancy type
    const vacancies: Vacancy[] = data.users.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      image: u.image,
      company: u.company,
      role: u.role,
    }));

    return vacancies;
  } catch (err) {
    console.error("Vacancy API Error:", err);
    throw err;
  }
}
