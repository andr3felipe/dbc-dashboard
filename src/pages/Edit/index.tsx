import { useParams } from "react-router-dom";
import * as S from "./styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchPersonById } from "../../http/People/fetchPersonById";
import { formatCpf } from "../../utils/formatCpf";
import { formatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import { Address } from "../../components/Address";
import { Button } from "../../components/Button";
import { House, Pencil, Phone, Trash } from "@phosphor-icons/react";
import BasicMenu from "../../components/BasicMenu";
import { Modal } from "../../components/Modal";
import { FormAddress } from "../../components/FormAddress";
import { AddressContext } from "../../contexts/AddressContext";
import { Contact } from "../../components/Contact";
import { FormContact } from "../../components/FormContact";
import { ContactContext } from "../../contexts/ContactContext";
import { FormPerson } from "../../components/PersonForm";
import { deletePersonById } from "../../http/People/deletePersonById";

export function Edit() {
  const { id } = useParams<{ id: string }>();
  const [showCpf, setShowCpf] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const { setAddress } = useContext(AddressContext);
  const { setContact } = useContext(ContactContext);

  const queryClient = useQueryClient();

  const { data: person, isLoading } = useQuery({
    queryFn: () => fetchPersonById({ id }),
    queryKey: ["people", { id }],
    onSuccess: (data) => {
      if (data?.enderecos.length > 0) {
        data.enderecos = data.enderecos.sort(
          (a, b) => a.idEndereco - b.idEndereco
        );
      }

      if (data?.contatos.length > 0) {
        data.contatos = data.contatos.sort((a, b) => a.idContato - b.idContato);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutateAsync: deletePersonMutation } = useMutation({
    mutationFn: deletePersonById,
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
  });

  function CloseAddressModal() {
    setIsAddressModalOpen((state) => !state);
  }

  function CloseContactModal() {
    setIsContactModalOpen((state) => !state);
  }

  function ClosePersonModal() {
    setIsPersonModalOpen((state) => !state);
  }

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadingScreen>
          <S.CircularProgress />
        </S.LoadingScreen>
      ) : person ? (
        <>
          <S.Section>
            <S.Flex gap={"0"}>
              <h1>Dados Pessoais</h1>

              <BasicMenu id="dados-pessoais-options">
                <Button
                  background="success-text"
                  color="white"
                  width="100%"
                  onClick={() => {
                    setIsPersonModalOpen((state) => !state);
                  }}
                >
                  Editar <Pencil fontSize={"1.25rem"} />
                </Button>
                <Button
                  background="error-text"
                  color="white"
                  width="100%"
                  onClick={async () => {
                    await deletePersonMutation({ id: person?.idPessoa });
                  }}
                >
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
                <S.Data transform="lowercase">{person?.email}</S.Data>
              </S.Row>
            </S.UserData>
          </S.Section>

          <S.Section>
            <S.Flex gap={"0"}>
              <h2>Endereços</h2>

              <BasicMenu id="enderecos-options">
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
              {person.enderecos.length > 0 ? (
                person?.enderecos?.map((endereco, index) => (
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
                ))
              ) : (
                <p>Cadastre um endereço.</p>
              )}
            </S.Flex>
          </S.Section>

          <S.Section>
            <S.Flex gap={"0"}>
              <h2>Contatos</h2>

              <BasicMenu id="contatos-options">
                <Button
                  background="primary"
                  color="white"
                  border="primary"
                  onClick={() => {
                    setContact(null);
                    setIsContactModalOpen((state) => !state);
                  }}
                >
                  Adicionar <Phone fontSize={"1.25rem"} />
                </Button>
              </BasicMenu>
            </S.Flex>

            <S.Flex>
              {person.contatos.length > 0 ? (
                person?.contatos?.map((contato, index) => (
                  <Contact
                    key={contato.idContato}
                    descricao={contato.descricao}
                    index={index}
                    telefone={contato.telefone}
                    tipoContato={contato.tipoContato}
                    idContato={contato.idContato}
                    editContact={() => {
                      setContact(contato);
                      setIsContactModalOpen(true);
                    }}
                  />
                ))
              ) : (
                <p>Pessoa não encontrada</p>
              )}
            </S.Flex>
          </S.Section>
        </>
      ) : (
        <>
          <S.LoadingScreen>
            <p>Pessoa não encontrada.</p>
          </S.LoadingScreen>
        </>
      )}

      <Modal
        open={isAddressModalOpen}
        setOpen={() => setIsAddressModalOpen((state) => !state)}
      >
        <FormAddress closeForm={CloseAddressModal} />
      </Modal>

      <Modal
        open={isContactModalOpen}
        setOpen={() => setIsContactModalOpen((state) => !state)}
      >
        <FormContact closeForm={CloseContactModal} />
      </Modal>

      <Modal
        open={isPersonModalOpen}
        setOpen={() => setIsPersonModalOpen((state) => !state)}
      >
        <FormPerson closeForm={ClosePersonModal} />
      </Modal>
    </S.Container>
  );
}
