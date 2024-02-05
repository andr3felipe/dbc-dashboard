import * as S from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../Button";
import { useContext } from "react";
import { AddressContext } from "../../contexts/AddressContext";
import { useMutation, useQueryClient } from "react-query";
import { addAddress } from "../../http/Address/addAddress";
import { useParams } from "react-router-dom";
import { editAddress } from "../../http/Address/editAddress";

const schema = yup
  .object({
    tipo: yup
      .string()
      .min(4, "Muito curto.")
      .required("Campo obrigatório.")
      .transform((_, originalValue) => {
        return originalValue ? originalValue.toUpperCase() : "";
      }),
    logradouro: yup
      .string()
      .min(4, "Muito curto.")
      .required("Campo obrigatório."),
    numero: yup.number().required("Campo obrigatório."),
    complemento: yup
      .string()
      .min(4, "Muito curto.")
      .required("Campo obrigatório."),
    cep: yup
      .string()
      .min(8, "Muito curto.")
      .required("Campo obrigatório.")
      .transform((_, originalValue) => {
        return originalValue ? originalValue.replace(/[^0-9]/g, "") : "";
      }),
    cidade: yup.string().min(2, "Muito curto.").required("Campo obrigatório."),
    estado: yup
      .string()
      .transform((_, originalValue) =>
        originalValue ? originalValue.toUpperCase() : ""
      )
      .min(2, "Muito curto.")
      .required("Campo obrigatório."),
    pais: yup.string().min(4, "Muito curto.").required("Campo obrigatório."),
  })
  .required();

type Address = yup.InferType<typeof schema>;

export function FormAddress({ closeForm }: { closeForm: () => void }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Address>({
    resolver: yupResolver(schema),
  });

  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { address } = useContext(AddressContext);

  const { mutateAsync: addAddressMutation } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  const { mutateAsync: editAddressMutation } = useMutation({
    mutationFn: editAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  const onSubmit = async (data: Address) => {
    if (id) {
      try {
        if (address) {
          await editAddressMutation({
            address: data,
            idPerson: Number(id),
            idAddress: address.idEndereco as number,
          });
        } else {
          await addAddressMutation({ address: data, id: Number(id) });
        }

        closeForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <h2>Cadastrar endereço</h2>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="tipo">Tipo:</S.Label>
          <S.NormalInput
            defaultValue={address?.tipo}
            width="100%"
            placeholder="Residencial / Comercial"
            {...register("tipo")}
          />
        </S.Row>
        <S.Error>{errors.tipo?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="logradouro">Logradouro:</S.Label>
          <S.NormalInput
            defaultValue={address?.logradouro}
            width="100%"
            placeholder="Rua das Flores"
            {...register("logradouro")}
          />
        </S.Row>
        <S.Error>{errors.logradouro?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="numero">Número:</S.Label>
          <S.NormalInput
            defaultValue={address?.numero}
            placeholder="123"
            {...register("numero")}
          />
        </S.Row>
        <S.Error>{errors.numero?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="complemento">Complemento:</S.Label>
          <S.NormalInput
            defaultValue={address?.complemento}
            width="100%"
            placeholder="Bloco / Apt. / Casa"
            {...register("complemento")}
          />
        </S.Row>
        <S.Error>{errors.complemento?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="cep">CEP:</S.Label>
          <S.InputMask
            defaultValue={address?.cep}
            width="5.5rem"
            mask="99999-999"
            placeholder="13504-365"
            maskChar="_"
            {...register("cep")}
          />
        </S.Row>
        <S.Error>{errors.cep?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="cidade">Cidade:</S.Label>
          <S.NormalInput
            defaultValue={address?.cidade}
            width="100%"
            placeholder="Rio Claro"
            {...register("cidade")}
          />
        </S.Row>
        <S.Error>{errors.cidade?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="estado">Estado:</S.Label>
          <S.InputMask
            defaultValue={address?.estado}
            width="2rem"
            mask="aa"
            placeholder="SP"
            {...register("estado")}
          />
        </S.Row>
        <S.Error>{errors.estado?.message}</S.Error>
      </S.Flex>

      <S.Flex>
        <S.Row>
          <S.Label htmlFor="pais">País:</S.Label>
          <S.NormalInput
            defaultValue={address?.pais}
            placeholder="Brasil"
            {...register("pais")}
          />
        </S.Row>
        <S.Error>{errors.pais?.message}</S.Error>
      </S.Flex>

      <Button background="primary" color="white">
        Confirmar
      </Button>
    </S.Container>
  );
}
