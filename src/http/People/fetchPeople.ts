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
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNjY1IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MDg3MTMyLCJleHAiOjE3MDcxNzM1MzJ9.yWXOssEoaZPebI9dFRUxmuRrJmAjnQjtDpCgMsnU-Nc",
      },
    }
  );

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data);
  }

  return await JSON.parse(data);
};
