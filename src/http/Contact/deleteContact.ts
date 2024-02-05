interface DeleteContactProps {
  contactId: number;
}

const token = localStorage.getItem("token") as string;

export const deleteContact = async ({ contactId }: DeleteContactProps) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/contato/${contactId}`,
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
  } catch (error) {
    console.error("Error deleting contact: ", error);
    throw error;
  }
};
