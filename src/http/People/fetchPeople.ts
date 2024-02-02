interface FetchPeopleProps {
  page?: number;
  pageSize?: number;
}

export const fetchPeople = async ({
  page = 0,
  pageSize = 20,
}: FetchPeopleProps = {}) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL +
      `/pessoa?pagina=${page}&tamanhoDasPaginas=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiMiIsImNhcmdvcyI6WyJST0xFX1VTVUFSSU8iLCJST0xFX0FETUlOIiwiUk9MRV9NQVJLRVRJTkciXSwiaWF0IjoxNzA2ODk4ODU3LCJleHAiOjE3MDY5ODUyNTd9.0L-rbWjbd5DU-1r77-T7K8aK7jOMc0pAwSubXtBC0AU",
      },
    }
  );

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data);
  }

  return await JSON.parse(data);
};
