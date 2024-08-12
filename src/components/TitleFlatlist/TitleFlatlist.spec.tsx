import { TitleFlatlist } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'

describe('Component: TitleFlatlist', () => {
  it('should be render component', () => {
    render(<TitleFlatlist title="title test" quantity={2} />)

    expect(screen.getByText('title test')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
  })
})
