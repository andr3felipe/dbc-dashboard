import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { Button } from "../Button";
import { fetchPersonById } from "../../http/People/fetchPersonById";
import { editPersonById } from "../../http/People/editPerson";

const schema = yup
  .object({
    nome: yup
      .string()
      .min(4, "Muito curto.")
      .required("Campo obrigatório.")
      .transform((_, originalValue) => {
        return originalValue
          ? originalValue.replace(/[^a-z\sáéíóúâêîôûãõ]/gi, "")
          : "";
      }),
    dataNascimento: yup
      .string()
      .min(10, "Formato inválido.")
      .required("Campo obrigatório.")
      .transform((_, originalValue) => {
        return originalValue
          ? originalValue
              .replace(/[_]/g, "")
              .split("-")
              .map((value: string, index: number) => {
                const today = new Date().getFullYear();

                if (index === 0) {
                  Number(value) > 1880 && Number(value) <= today
                    ? value
                    : (value = "");

                  return value;
                }

                if (index === 2) {
                  Number(value) > 0 && Number(value) <= 31
                    ? value
                    : (value = "");

                  return value;
                }

                if (index === 1) {
                  Number(value) > 0 && Number(value) <= 12
                    ? value
                    : (value = "");

                  return value;
                }

                return value;
              })
              .join("-")
          : "";
      }),

    cpf: yup
      .string()
      .min(11, "Formato inválido.")
      .required("Campo obrigatório.")
      .transform((_, originalValue) => {
        return originalValue ? originalValue.replace(/[^0-9]/g, "") : "";
      }),
    email: yup
      .string()
      .email("Formato inválido")
      .min(5, "Formato inválido")
      .required("Campo obrigatório."),
  })
  .required();

type Person = yup.InferType<typeof schema>;

export function FormPerson({ closeForm }: { closeForm: () => void }) {
  const { id } = useParams<{ id: string }>();

  const { data: person } = useQuery({
    queryFn: () => fetchPersonById({ id }),
    queryKey: ["people", { id }],
    onError: (error) => {
      console.log(error);
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: editPersonByIdMutation } = useMutation({
    mutationFn: editPersonById,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Person>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Person) => {
    if (id) {
      try {
        if (person) {
          await editPersonByIdMutation({
            person: data,
            id: Number(id),
          });
        }

        closeForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <h2>Editar pessoa</h2>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="nome">Nome:</S.Label>
          <S.NormalInput
            defaultValue={person?.nome}
            width="100%"
            placeholder="André / Maria / etc"
            {...register("nome")}
          />
        </S.Row>
        <S.Error>{errors.nome?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="email">Email:</S.Label>
          <S.NormalInput
            defaultValue={person?.email}
            width="100%"
            placeholder="2000-12-25"
            {...register("email")}
          />
        </S.Row>
        <S.Error>{errors.email?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="dataNascimento">Data de Nascimento:</S.Label>
          <S.InputMask
            defaultValue={person?.dataNascimento}
            mask={"9999-99-99"}
            maskChar={"_"}
            width="100%"
            placeholder="2000-12-25"
            {...register("dataNascimento")}
          />
        </S.Row>
        <S.Error>{errors.dataNascimento?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="cpf">CPF:</S.Label>
          <S.InputMask
            defaultValue={person?.cpf}
            width="100%"
            mask={"999.999.999-99"}
            placeholder="WhatsApp / Telegram / E-mail / etc."
            {...register("cpf")}
          />
        </S.Row>
        <S.Error>{errors.cpf?.message}</S.Error>
      </S.Flex>

      <Button background="primary" type="submit" color="white">
        Confirmar
      </Button>
    </S.Container>
  );
}
