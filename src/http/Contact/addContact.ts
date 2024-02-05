interface addContactProps {
  personId: number;
  contact: Contact;
}

interface Contact {
  tipoContato: string;
  telefone: string;
  descricao: string;
}

export const addContact = async ({
  personId,
  contact,
}: addContactProps): Promise<Contact> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/contato/${personId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNTE0IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MTE1MTE0LCJleHAiOjE3MDcyMDE1MTR9.umil_0QDrmjCnVjyfBWpSI60d4bZhWRydK2xWkdwlcc",
        },
        body: JSON.stringify(contact),
      }
    );

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data);
    }

    return await JSON.parse(data);
  } catch (error) {
    console.error("Error adding contact: ", error);
    throw error;
  }
};
