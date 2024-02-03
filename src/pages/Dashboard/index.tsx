import { useQuery } from "react-query";
import { fetchPeople } from "../../http/People/fetchPeople";
import { DataGrid, GridColDef } from '@mui/x-data-grid';


import * as S from "./styles";
import { TableCell } from "@mui/material";

export function Dashboard() {
  const { data: people = { content: [] } } = useQuery({
    queryFn: () => fetchPeople(),
    queryKey: ["people"],
    onError: (error) => {
      console.log(error);
    },
  });

  const firstUser = people.content[0];
  // const userId = firstUser ? firstUser.idPessoa : 'ID not available';
  const userName = firstUser ? firstUser.nome : 'Name not available';
  // const userCpf = firstUser ? firstUser.cpf : 'CPF not available';
  // const userEmail = firstUser ? firstUser.cpf : 'E-mail not available';

  // console.log(userId)
  // console.log(userName)
  // console.log(userCpf)
  // console.log(userEmail)

  const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70},
      { field: 'name', headerName: 'Nome', width: 300 },
      { field: 'email', headerName: 'E-mail', width: 300 },
      { field: 'details', headerName: 'Detalhes', width: 150 },
      { field: 'delete', headerName: 'Deletar', width: 150 },
  ];

  const rows = people.content.map((users: { idPessoa: any; nome: any; email: any; }) => ({
    id: users.idPessoa, 
    name: users.nome, 
    email: users.email,
    details: 'Detalhes'
  }));

  return (
    <S.Container>
      <S.Header>
        <span>Hello {userName}</span>
        <input 
          type="text" 
          placeholder="Digite o nome do usuário aqui"
        />
      </S.Header>
      <div style={{ width: '80%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 50]}
          checkboxSelection
        />
        <TableCell>

        </TableCell>
      </div>
    </S.Container>
  );
}
