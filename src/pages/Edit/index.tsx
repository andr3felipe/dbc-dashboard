import { useParams } from "react-router-dom";
import * as S from "./styles";
import { useQuery } from "react-query";
import { fetchPersonById } from "../../http/People/fetchPersonById";
import { formatCpf } from "../../utils/formatCpf";
import { formatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import { Address } from "../../components/Address";
import { Button } from "../../components/Button";
import { House, Pencil, Trash } from "@phosphor-icons/react";
import BasicMenu from "../../components/BasicMenu";
import { Modal } from "../../components/Modal";
import { FormAddress } from "../../components/FormAddress";
import { AddressContext } from "../../contexts/AddressContext";

export function Edit() {
  const { id } = useParams<{ id: string }>();
  const [showCpf, setShowCpf] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { setAddress } = useContext(AddressContext);

  const { data: person, isLoading } = useQuery({
    queryFn: () => fetchPersonById({ id }),
    queryKey: ["people", { id }],
    onSuccess: (data) => {
      if (data?.enderecos.length > 0) {
        data.enderecos = data.enderecos.sort(
          (a, b) => a.idEndereco - b.idEndereco
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function CloseModal() {
    setIsAddressModalOpen((state) => !state);
  }

  return (
    <S.Container>
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : person ? (
        <>
          <S.Section>
            <S.Flex gap={"0"}>
              <h1>Dados Pessoais</h1>
              <BasicMenu>
                <Button background="success-text" color="white" width="100%">
                  Editar <Pencil fontSize={"1.25rem"} />
                </Button>
                <Button background="error-text" color="white" width="100%">
                  Excluir <Trash fontSize={"1.25rem"} />
                </Button>
              </BasicMenu>
            </S.Flex>

            <S.UserData>
              <S.Row>
                <S.DataType>Nome: </S.DataType>
                <S.Data>{person?.nome}</S.Data>
              </S.Row>

              <S.Row>
                <S.DataType>Data de nascimento: </S.DataType>
                <S.Data>{formatDate(person?.dataNascimento)}</S.Data>
              </S.Row>

              <S.Row>
                <S.DataType>CPF: </S.DataType>
                <S.Data width="125">
                  {showCpf ? formatCpf(person?.cpf) : "***.***.***-**"}
                </S.Data>
                {!showCpf && <S.Eye onClick={() => setShowCpf(!showCpf)} />}
                {showCpf && <S.EyeSlash onClick={() => setShowCpf(!showCpf)} />}
              </S.Row>

              <S.Row>
                <S.DataType>Email: </S.DataType>
                <S.Data>{person?.email}</S.Data>
              </S.Row>
            </S.UserData>
          </S.Section>

          <S.Section>
            <S.Flex gap={"0"}>
              <h2>Endereços</h2>

              <BasicMenu>
                <Button
                  background="primary"
                  color="white"
                  border="primary"
                  onClick={() => {
                    setAddress(null);
                    setIsAddressModalOpen((state) => !state);
                  }}
                >
                  Adicionar <House fontSize={"1.25rem"} />
                </Button>
              </BasicMenu>
            </S.Flex>

            <S.Flex>
              {person?.enderecos?.map((endereco, index) => (
                <Address
                  key={endereco.idEndereco}
                  tipo={endereco.tipo}
                  cep={endereco.cep}
                  cidade={endereco.cidade}
                  complemento={endereco.complemento}
                  estado={endereco.estado}
                  idEndereco={endereco.idEndereco}
                  idPessoa={endereco.idPessoa}
                  index={index}
                  logradouro={endereco.logradouro}
                  numero={endereco.numero}
                  pais={endereco.pais}
                  editAddress={() => {
                    setAddress(endereco);
                    setIsAddressModalOpen(true);
                  }}
                />
              ))}
            </S.Flex>
          </S.Section>
        </>
      ) : (
        <>
          <p>Pessoa não encontrada.</p>
        </>
      )}

      <Modal
        open={isAddressModalOpen}
        setOpen={() => setIsAddressModalOpen((state) => !state)}
      >
        <FormAddress closeForm={CloseModal} />
      </Modal>
    </S.Container>
  );
}
