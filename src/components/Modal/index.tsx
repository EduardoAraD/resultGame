import { FlatList, Modal } from 'react-native';

import { Clube } from '../../Model/Clube';
import { CardClub } from '../CardClub';

import { CloseButton, Container, Input, Line, ModalView, Title } from './styles';
import { clubes } from '../../utils/clubes';
import { useMemo, useState } from 'react';

interface ModalChooseClubProps {
  visible: boolean;
  onClose: () => void;
  onSelectedClub: (club: Clube) => void;
}

export function ModalChooseClub ({
  visible,
  onClose,
  onSelectedClub,
}: ModalChooseClubProps) {
  const [search, setSearch] = useState('');

  function selectedCard(club: Clube) {
    onSelectedClub(club);
    setSearch('');
    onClose();
  }

  const listClubs = useMemo(() => {
    const searchLow = search.toLowerCase();
    return clubes.filter(club =>
      club.name.toLocaleLowerCase().includes(searchLow));
  }, [search]);

  return (
    <Modal
      animationType="slide"
      style={{ flex: 1 }}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Container>
        <ModalView>
          <CloseButton activeOpacity={0.7} onPress={onClose}>
            <Title>X</Title>
          </CloseButton>
          <Title>Escolha o clube</Title>
          <Input
            placeholder='Filtrar clube'
            value={search}
            onChangeText={setSearch}
          />
          <FlatList
            data={listClubs}
            keyExtractor={item => `${item.name}-${item.overall}`}
            renderItem={({ item }) => (
              <CardClub
                club={item}
                onPress={() => selectedCard(item)}
              />
            )}
            contentContainerStyle={{
              padding: 10,
              paddingBottom: 40,
            }}
            ItemSeparatorComponent={() => <Line />}
          />
        </ModalView>
      </Container>
    </Modal>
  );
};
