interface AddAddressProps {
  idAddress: number;
  idPerson: number;
  address: Endereco;
}

interface Endereco {
  tipo: string;
  logradouro: string;
  numero: number;
  complemento: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
}

export const editAddress = async ({
  idAddress,
  idPerson,
  address,
}: AddAddressProps): Promise<Endereco> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/endereco/${idAddress}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNTE0IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MTE1MTE0LCJleHAiOjE3MDcyMDE1MTR9.umil_0QDrmjCnVjyfBWpSI60d4bZhWRydK2xWkdwlcc",
        },
        body: JSON.stringify({ ...address, idPessoa: idPerson }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return await data;
  } catch (error) {
    console.error("Error editing address: ", error);
    throw error;
  }
};
