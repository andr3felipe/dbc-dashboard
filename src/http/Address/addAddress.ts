interface AddAddressProps {
  id: number;
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

export const addAddress = async ({
  id,
  address,
}: AddAddressProps): Promise<Endereco> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/endereco/${id}?idPessoa=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNTE0IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MTE1MTE0LCJleHAiOjE3MDcyMDE1MTR9.umil_0QDrmjCnVjyfBWpSI60d4bZhWRydK2xWkdwlcc",
        },
        body: JSON.stringify(address),
      }
    );

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }

    return await JSON.parse(data);
  } catch (error) {
    console.error("Error adding address: ", error);
    throw error;
  }
};
