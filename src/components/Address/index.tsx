import { Pencil, Trash } from "@phosphor-icons/react";
import { formatCep } from "../../utils/formatCep";
import { Button } from "../Button";
import * as S from "./styles";
import BasicMenu from "../BasicMenu";
import { useMutation, useQueryClient } from "react-query";
import { deleteAddress } from "../../http/Address/deleteAddress";

interface AddressProps {
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
  index: number;
  editAddress?: () => void;
  deleteAddress?: () => void;
}

export function Address({
  tipo,
  logradouro,
  numero,
  complemento,
  cep,
  cidade,
  estado,
  pais,
  idEndereco,
  index,
  editAddress,
}: AddressProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAddressMutation } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  return (
    <S.Container>
      <S.Flex>
        <h3>Endereço {index + 1}</h3>
        <S.Flex>
          <BasicMenu>
            <Button
              background="success-text"
              color="white"
              onClick={editAddress}
            >
              Editar <Pencil fontSize={"1.25rem"} />
            </Button>
            <Button
              background="error-text"
              color="white"
              onClick={async () => {
                try {
                  await deleteAddressMutation({ id: idEndereco });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Excluir <Trash fontSize={"1.25rem"} />
            </Button>
          </BasicMenu>
        </S.Flex>
      </S.Flex>

      <S.Row>
        <S.DataType>Tipo: </S.DataType>
        <S.Data>{tipo.toLocaleLowerCase()}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Logradouro: </S.DataType>
        <S.Data>{logradouro}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Número: </S.DataType>
        <S.Data>{numero}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Complemento: </S.DataType>
        <S.Data>{complemento}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>CEP: </S.DataType>
        <S.Data>{formatCep(cep)}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Cidade: </S.DataType>
        <S.Data>{cidade}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Estado: </S.DataType>
        <S.Data>{estado}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Pais: </S.DataType>
        <S.Data>{pais}</S.Data>
      </S.Row>
    </S.Container>
  );
}
