import { useQuery } from "react-query";
import { fetchPeople } from "../../http/People/fetchPeople";
import * as S from "./styles";

export function Dashboard() {
  const { data: people } = useQuery({
    queryFn: () => fetchPeople(),
    queryKey: ["people"],
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(people);

  return (
    <S.Container>
      <h1>Dashboard</h1>
    </S.Container>
  );
}
