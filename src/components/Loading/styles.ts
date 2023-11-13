import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ActiveStyle = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.white,
  size: 32,
}))``;
