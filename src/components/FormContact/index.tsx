import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import { useMutation, useQueryClient } from "react-query";
import { addContact } from "../../http/Contact/addContact";
import { useParams } from "react-router";
import { Button } from "../Button";
import { editContact } from "../../http/Contact/editContact";

const schema = yup
  .object({
    tipoContato: yup
      .string()
      .min(4, "Muito curto.")
      .required("Campo obrigatório.")
      .transform((_, originalValue) => {
        return originalValue ? originalValue.toUpperCase() : "";
      }),
    telefone: yup
      .string()
      .min(14, "Muito curto.")
      .required("Campo obrigatório."),
    descricao: yup
      .string()
      .min(4, "Muito curto.")
      .required("Campo obrigatório."),
  })
  .required();

type Contact = yup.InferType<typeof schema>;

export function FormContact({ closeForm }: { closeForm: () => void }) {
  const { contact } = useContext(ContactContext);

  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { mutateAsync: addContactMutation } = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  const { mutateAsync: editContactMutation } = useMutation({
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Contact) => {
    console.log(data);
    if (id) {
      try {
        if (contact) {
          await editContactMutation({
            contact: data,
            contactId: contact.idContato as number,
          });
        } else {
          await addContactMutation({ personId: Number(id), contact: data });
        }

        closeForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <h2>Cadastrar contato</h2>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="tipoContato">Tipo:</S.Label>
          <S.NormalInput
            defaultValue={contact?.tipoContato}
            width="100%"
            placeholder="Residencial / Comercial"
            {...register("tipoContato")}
          />
        </S.Row>
        <S.Error>{errors.tipoContato?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="telefone">Telefone:</S.Label>
          <S.InputMask
            defaultValue={contact?.telefone}
            mask={"(99)99999-9999"}
            width="100%"
            placeholder="(99)99999-9999"
            {...register("telefone")}
          />
        </S.Row>
        <S.Error>{errors.telefone?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="descricao">Descrição:</S.Label>
          <S.NormalInput
            defaultValue={contact?.descricao}
            width="100%"
            placeholder="WhatsApp / Telegram / E-mail / etc."
            {...register("descricao")}
          />
        </S.Row>
        <S.Error>{errors.descricao?.message}</S.Error>
      </S.Flex>

      <Button background="primary" color="white">
        Confirmar
      </Button>
    </S.Container>
  );
}
