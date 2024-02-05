import { Container, Safe } from './styles'

interface BackgroundProps {
  children: React.ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <Container>
      <Safe>{children}</Safe>
    </Container>
  )
}
