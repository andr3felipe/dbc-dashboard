interface FetchPeopleProps {
  page?: number;
  pageSize?: number;
}

const token = localStorage.getItem("token") as string;
export const fetchPeople = async ({
  page = 0,
  pageSize = 100,
}: FetchPeopleProps = {}) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL +
      `/pessoa?pagina=${page}&tamanhoDasPaginas=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data);
  }

  return await JSON.parse(data);
};
