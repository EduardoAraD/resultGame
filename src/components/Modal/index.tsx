import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import Animated, { SlideInDown, SlideInRight, SlideOutDown, SlideOutRight } from 'react-native-reanimated';

import { Clube } from '../../Model/Clube';
import { CardClub } from '../CardClub';

import { clubes } from '../../utils/clubes';
import { CloseButton, Container, Input, Line, ModalView, Title } from './styles';

export type HomeOrAway = 'home'|'away';

interface ModalChooseClubProps {
  visible: boolean;
  onClose: () => void;
  onSelectedClub: (club: Clube, homeOrAway: HomeOrAway) => void;
  homeOrAway: HomeOrAway;
}

export function ModalChooseClub ({
  visible,
  onClose,
  onSelectedClub,
  homeOrAway
}: ModalChooseClubProps) {
  const [search, setSearch] = useState('');

  function selectedCard(club: Clube) {
    onSelectedClub(club, homeOrAway);
    setSearch('');
    onClose();
  }

  const listClubs = useMemo(() => {
    const searchLow = search.toLowerCase();
    return clubes.filter(club =>
      club.name.toLocaleLowerCase().includes(searchLow));
  }, [search]);

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    >
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
              <Animated.View
                entering={SlideInRight}
                exiting={SlideOutRight}
              >
                <CardClub
                  club={item}
                  onPress={() => selectedCard(item)}
                />
              </Animated.View>
            )}
            contentContainerStyle={{
              padding: 10,
              paddingBottom: 40,
            }}
            ItemSeparatorComponent={() => <Line />}
          />
        </ModalView>
      </Container>
    </Animated.View>
  );
};
