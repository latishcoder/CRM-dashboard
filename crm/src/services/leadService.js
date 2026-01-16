const API_URL = import.meta.env.VITE_API_URL;

export const fetchLeads = async ({
  page = 1,
  limit = 10,
  search = "",
  stage = "",
  source = "",
}) => {
  const params = new URLSearchParams({
    page,
    limit,
    search,
    stage,
    source,
  }).toString();

  const response = await fetch(
    `${API_URL}/api/leads?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return await response.json();
};
