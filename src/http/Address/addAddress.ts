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

const token = localStorage.getItem("token") as string;

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
          Authorization: token,
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
