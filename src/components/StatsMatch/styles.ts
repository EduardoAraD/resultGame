import styled from 'styled-components/native'

export const Container = styled.View``

export const Content = styled.View`
  padding: 10px;
  gap: 2px;
`

export const DivLogos = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.blue_200};
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0.25;
`

export const LogoHome = styled.Image`
  height: 240px;
  width: 240px;
  margin-left: -120px;
  object-fit: contain;
`

export const LogoAway = styled.Image`
  height: 240px;
  width: 240px;
  margin-right: -120px;
  object-fit: contain;
`
