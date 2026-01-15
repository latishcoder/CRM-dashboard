const API_URL = "http://localhost:5000/api/leads";

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
  });

  const response = await fetch(`${API_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
};
