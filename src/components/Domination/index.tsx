import { Container, DomainAway, DomainHome, Text } from "./styles";

interface DominationProps {
  domainHome: number;
  domainAway: number;
  minute: number
}

export function Domination({ domainAway, domainHome, minute }: DominationProps) {
  const domainTotal = domainHome + domainAway;
  const widthHome = domainHome / (domainTotal) * 100
  const widthAway = domainAway / (domainTotal) * 100

  // const half = minute > 45 ? 2 : 1

  return (
    <>
      <Text>{minute}'</Text>
      <Container>
        <DomainHome style={{ width: `${widthHome}%` }} />
        <DomainAway style={{ width: `${widthAway}%` }} />
      </Container>
    </>
  )
}