export async function fetchCompanies() {
  const response = await fetch('http://localhost:3001/companies');
  if (!response.ok) throw new Error('Network error');
  return response.json(); // array expected here
}

