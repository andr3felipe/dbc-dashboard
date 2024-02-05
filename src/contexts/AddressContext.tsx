import { createContext, useState } from "react";

interface AddressContextType {
  address: Address | null;
  setAddress: (address: Address | null) => void;
}

interface Address {
  tipo?: string;
  logradouro?: string;
  numero?: number;
  complemento?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  idEndereco?: number;
}

export const AddressContext = createContext({} as AddressContextType);

interface AddressContextProviderProps {
  children: React.ReactNode;
}

export function AddressContextProvider({
  children,
}: AddressContextProviderProps) {
  const [address, setAddressData] = useState<Address | null>(null);

  function setAddress(address: Address | null) {
    setAddressData(address);
  }

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
}
