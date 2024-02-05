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

const token = localStorage.getItem("token") as string;

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
          Authorization: token,
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
