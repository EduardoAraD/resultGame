import { TitleWithTouchBack } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'

describe('Component: TitleWithTouchBack', () => {
  it('should be render component', () => {
    render(<TitleWithTouchBack title="title test" />)

    expect(screen.getByText('title test')).toBeTruthy()
  })
})
