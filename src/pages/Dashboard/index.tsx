import { useQuery, useQueryClient } from "react-query";
import { fetchPeople } from "../../http/People/fetchPeople";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { deleteUser } from "../../http/People/deletePeople";
import { Button } from "../../components/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Users from "../../assets/Group 10.svg";

import * as S from "./styles";

export function Dashboard() {
  const { data: people = { content: [] } } = useQuery({
    queryFn: () => fetchPeople(),
    queryKey: ["people"],
    onError: (error) => {
      console.log(error);
    },
  });

  const queryClient = useQueryClient();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const allUsers = people.totalElements;
  const totalPages = people.totalPages;

  const handleDeleteClick = async (userId: string) => {
    try {
      await deleteUser({ userId });
      queryClient.invalidateQueries("people");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const columns = isSmallScreen
    ? [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Nome", width: 200 },
        {
          field: "details",
          headerName: "Detalhes",
          width: 110,
          renderCell: () => (
            <NavLink to={"/Edit"}>
              <Button
                color="success-text"
                background="success-background"
                border="success-text"
              >
                Detalhes
              </Button>
            </NavLink>
          ),
        },
        {
          field: "delete",
          headerName: "Deletar",
          width: 100,
          renderCell: (params: { row: { id: string } }) => (
            <Button
              color="error-text"
              background="error-background"
              border="error-text"
              onClick={() => handleDeleteClick(params.row.id)}
            >
              Deletar
            </Button>
          ),
        },
      ]
    : [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nome", width: 350 },
        { field: "email", headerName: "E-mail", width: 350 },
        { field: "birth", headerName: "Data de Nascimento", width: 200 },
        {
          field: "details",
          headerName: "Detalhes",
          width: 110,
          renderCell: () => (
            <NavLink to={"/Edit"}>
              <Button
                color="success-text"
                background="success-background"
                border="success-text"
              >
                Detalhes
              </Button>
            </NavLink>
          ),
        },
        {
          field: "delete",
          headerName: "Deletar",
          width: 100,
          renderCell: (params: { row: { id: string } }) => (
            <Button
              color="error-text"
              background="error-background"
              border="error-text"
              onClick={() => handleDeleteClick(params.row.id)}
            >
              Deletar
            </Button>
          ),
        },
      ];

  const rows = isSmallScreen
    ? people.content.map((users: { idPessoa: any; nome: any }) => ({
        id: users.idPessoa,
        name: users.nome,
      }))
    : people.content.map(
        (users: {
          idPessoa: any;
          nome: any;
          email: any;
          dataNascimento: any;
        }) => ({
          id: users.idPessoa,
          name: users.nome,
          email: users.email,
          birth: users.dataNascimento,
        })
      );

  return (
    <S.Container>
      <S.Header>
        <span>Hello Admin,</span>
      </S.Header>
      <S.Infos>
        <S.Users>
          <S.Row>
            <img src={Users} alt="" />
            <p>
              Total de usuários <span>{allUsers}</span>
            </p>
          </S.Row>
          <S.Row>
            <img src={Users} alt="" />
            <p>
              Total de páginas <span>{totalPages}</span>
            </p>
          </S.Row>
        </S.Users>
      </S.Infos>
      <S.InfosTable>
        <h2>Todos os usuários</h2>
      </S.InfosTable>
      <S.Table>
        <DataGrid
          style={S.DataGridStyle}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 50]}
        />
      </S.Table>
    </S.Container>
  );
}
