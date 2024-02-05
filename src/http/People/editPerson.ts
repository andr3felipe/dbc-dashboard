interface EditPersonByIdProps {
  id: number;
  person: PersonData;
}

export interface PersonData {
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
}

const token = localStorage.getItem("token") as string;
export const editPersonById = async ({
  id,
  person,
}: EditPersonByIdProps): Promise<PersonData> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/pessoa/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(person),
      }
    );

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }

    return await JSON.parse(data);
  } catch (error) {
    console.error("Error editing person by id: ", error);
    throw error;
  }
};
