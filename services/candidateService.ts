import { Platform } from "react-native";

export type Candidate = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: string;
  role: string;
};

export type CreateCandidatePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  image?: string;
};

const BASE_URL =
  Platform.OS === "android" ? "http://192.168.1.28:8080" : "http://localhost:8080";

export async function fetchCandidates(): Promise<Candidate[]> {
  try {
    const res = await fetch(`${BASE_URL}/candidates`);
    if (!res.ok) throw new Error("Failed to fetch candidates");

    const data = await res.json();

    return data.users.map((u: any): Candidate => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      image: u.image,
      company: u.company,
      role: u.role,
    }));
  } catch (err) {
    console.error("Candidate API Error:", err);
    throw err;
  }
}

export async function createCandidate(
  payload: CreateCandidatePayload
): Promise<Candidate> {
  const res = await fetch(`${BASE_URL}/candidates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to create candidate");
  }

  const u = await res.json();

  return {
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    phone: u.phone,
    image: u.image,
    company: u.company,
    role: u.role,
  };
}

export async function updateCandidate(
  id: number,
  payload: CreateCandidatePayload
): Promise<Candidate> {
  const res = await fetch(`${BASE_URL}/candidates/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to update candidate");
  }

  const u = await res.json();

  return {
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    phone: u.phone,
    image: u.image,
    company: u.company,
    role: u.role,
  };
}

export async function deleteCandidate(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/candidates/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to delete candidate");
  }
}
