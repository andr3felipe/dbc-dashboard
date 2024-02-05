interface FetchPersonByIdProps {
  id?: string;
}

export interface PersonData {
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  idPessoa: number;
  contatos: [];
  enderecos: Endereco[];
}

interface Endereco {
  idPessoa: null;
  tipo: string;
  logradouro: string;
  numero: number;
  complemento: string;
  cep: string;
  cidade: string;
  estado: string;
  pais: string;
  idEndereco: number;
}

export const fetchPersonById = async ({
  id,
}: FetchPersonByIdProps): Promise<PersonData> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/pessoa/lista-completa?idPessoa=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNTE0IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MDcwNjE4LCJleHAiOjE3MDcxNTcwMTh9.DdKFRHQpq9-wURMDMZVj1exjf6rhLvWI8GZ-MAe6S-A",
        },
      }
    );

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }

    return await JSON.parse(data)[0];
  } catch (error) {
    console.error("Error fetching person by id: ", error);
    throw error;
  }
};
