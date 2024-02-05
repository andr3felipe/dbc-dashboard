import { Pencil, Trash } from "@phosphor-icons/react";
import BasicMenu from "../BasicMenu";
import { Button } from "../Button";
import * as S from "./styles";
import { useMutation, useQueryClient } from "react-query";
import { deleteContact } from "../../http/Contact/deleteContact";

interface ContactProps {
  tipoContato: string;
  telefone: string;
  descricao: string;
  index: number;
  idContato: number;
  editContact: () => void;
}

export function Contact({
  tipoContato,
  telefone,
  descricao,
  index,
  idContato,
  editContact,
}: ContactProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteContactMutation } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  return (
    <S.Container>
      <S.Flex>
        <h3>Contato {index + 1}</h3>
        <S.Flex>
          <BasicMenu>
            <Button
              background="success-text"
              color="white"
              onClick={editContact}
            >
              Editar <Pencil fontSize={"1.25rem"} />
            </Button>
            <Button
              background="error-text"
              color="white"
              onClick={async () => {
                try {
                  await deleteContactMutation({ contactId: idContato });
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
        <S.Data>{tipoContato.toLocaleLowerCase()}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Telefone: </S.DataType>
        <S.Data>{telefone}</S.Data>
      </S.Row>

      <S.Row>
        <S.DataType>Descrição: </S.DataType>
        <S.Data>{descricao}</S.Data>
      </S.Row>
    </S.Container>
  );
}
