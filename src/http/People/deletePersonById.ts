interface DeletePersonByIdProps {
  id: number;
}

export const deletePersonById = async ({ id }: DeletePersonByIdProps) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/pessoa/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNTE0IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MDcwNjE4LCJleHAiOjE3MDcxNTcwMTh9.DdKFRHQpq9-wURMDMZVj1exjf6rhLvWI8GZ-MAe6S-A",
        },
      }
    );

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw new Error(`Failed to delete user: ${error}`);
  }
};
