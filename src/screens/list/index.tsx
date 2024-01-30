import { FlatList, Pressable } from "react-native";
import { Container, Safe, Text } from "./styles";
import { jogosD } from "../../utils/jogos";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/Modal/styles";
// import { Text } from "../../components/MomentsGame/styles";

interface ItemList {
  game: string;
  marked: boolean;
}

export function List() {
  const [search, setSearch] = useState('');
  const [list, setList] = useState<ItemList[]>([]);

  function handleMarked(game: string) {
    setList(state => state.map(item =>
      item.game === game ?
        ({ ...item, marked: !item.marked }) :
        item
      )
    );
  }

  useEffect(() => {
    const listJogos: ItemList[] = jogosD.map(item => ({ game: item, marked: false }))
    setList(listJogos);
  }, [jogosD]);

  const listJogos = useMemo(() => {
    return list.filter(item => item.game.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [list, search]);

  return (
    <Safe>
      <Container>
        <Input
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={listJogos}
          keyExtractor={item => item.game}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handleMarked(item.game)}>
              <Text marked={item.marked}>{index + 1}.   {item.game}</Text>
            </Pressable>
          )}
        />
      </Container>
    </Safe>
  )
}