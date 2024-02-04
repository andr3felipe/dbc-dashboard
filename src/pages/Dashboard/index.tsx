import { useQuery, useQueryClient } from "react-query";
import { fetchPeople } from "../../http/People/fetchPeople";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { deleteUser } from "../../http/People/deletePeople";
import { Button } from "../../components/Button";
import Elipse from "../../assets/Ellipse 3.png";
import Logo from "../../assets/setting 1.svg";
import Logout from "../../assets/sair-do-usuario.svg";

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
  const allUsers = people.totalElements;
  const members = people.totalPages;
  const membersActives = people.page;

  const firstUser = people.content[0];
  const userName = firstUser ? firstUser.nome : "Name not available";

  const handleDeleteClick = async (userId: string) => {
    try {
      await deleteUser({ userId });
      queryClient.invalidateQueries("people");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", width: 250 },
    { field: "email", headerName: "E-mail", width: 300 },
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

  const rows = people.content.map(
    (users: { idPessoa: any; nome: any; email: any }) => ({
      id: users.idPessoa,
      name: users.nome,
      email: users.email,
    })
  );

  return (
    <>
      <S.Aside>
        <div className="title">
          <img src={Logo} alt="" />
          <h1>Dashboard</h1>
        </div>
        <Button className="menu" color={"secondary"} background={"background"}>
          <img src={Logout} alt="" />
          <span>Dashboard</span>
        </Button>
        <NavLink className="LogoutNav" to={"/Login"}>
          <Button
            className="logout"
            color={"secondary"}
            background={"background"}
          >
            <img src={Logout} alt="" />
            <span>Logout</span>
          </Button>
        </NavLink>
      </S.Aside>
      <S.Container>
        <S.Header>
          <span>Hello {userName},</span>
          {/* <input type="text" placeholder="Digite o nome do usuário aqui" /> */}
        </S.Header>
        <S.Infos>
          <S.Users>
            <img src={Elipse} alt="" />
            <p>
              Total de usuários <span>{allUsers}</span>
            </p>
            <img src={Elipse} alt="" />
            <p>
              Membros <span>{members}</span>
            </p>
            <img src={Elipse} alt="" />
            <p>
              Ativos <span>{membersActives}</span>
            </p>
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
    </>
  );
}
