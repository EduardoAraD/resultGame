import { FlatList, Modal } from 'react-native';

import { Clube } from '../../Model/Clube';
import { CardClub } from '../CardClub';

import { CloseButton, Container, Line, ModalView, Title } from './styles';
import { clubes } from '../../utils/clubes';

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
  function selectedCard(club: Clube) {
    onSelectedClub(club);
    onClose();
  }

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
          <FlatList
            data={clubes}
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
