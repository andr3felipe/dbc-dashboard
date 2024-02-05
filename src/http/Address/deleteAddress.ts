interface DeleteAddressProps {
  id: number;
}

const token = localStorage.getItem("token") as string;
export const deleteAddress = async ({ id }: DeleteAddressProps) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/endereco/${id}`,
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
    console.error("Error deleting address: ", error);
    throw error;
  }
};
