import { createContext, useState } from "react";

interface ContactContextType {
  contact: Contact | null;
  setContact: (contact: Contact | null) => void;
}

interface Contact {
  idContato: number;
  descricao: string;
  telefone: string;
  tipoContato: string;
}

export const ContactContext = createContext({} as ContactContextType);

interface ContactContextProviderProps {
  children: React.ReactNode;
}

export function ContactContextProvider({
  children,
}: ContactContextProviderProps) {
  const [contact, setContactData] = useState<Contact | null>(null);

  function setContact(contact: Contact | null) {
    setContactData(contact);
  }

  return (
    <ContactContext.Provider value={{ contact, setContact }}>
      {children}
    </ContactContext.Provider>
  );
}
