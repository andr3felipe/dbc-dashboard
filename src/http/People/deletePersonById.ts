interface DeletePersonByIdProps {
  id: number;
}

const token = localStorage.getItem("token") as string;

export const deletePersonById = async ({ id }: DeletePersonByIdProps) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/pessoa/${id}`,
      {
        method: "DELETE",
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

    return data;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw new Error(`Failed to delete user: ${error}`);
  }
};
