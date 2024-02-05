interface DeleteContactProps {
  contactId: number;
}

export const deleteContact = async ({ contactId }: DeleteContactProps) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/contato/${contactId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNTE0IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MTE1MTE0LCJleHAiOjE3MDcyMDE1MTR9.umil_0QDrmjCnVjyfBWpSI60d4bZhWRydK2xWkdwlcc",
        },
      }
    );

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }
  } catch (error) {
    console.error("Error deleting contact: ", error);
    throw error;
  }
};
