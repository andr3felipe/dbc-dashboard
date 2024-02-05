interface EditContactProps {
  contactId: number;
  contact: Contact;
}

interface Contact {
  tipoContato: string;
  telefone: string;
  descricao: string;
}

const token = localStorage.getItem("token") as string;

export const editContact = async ({
  contactId,
  contact,
}: EditContactProps): Promise<Contact> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/contato/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
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
