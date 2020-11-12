import React from 'react';
import { render, queries, screen, fireEvent, within } from '@testing-library/react';
import LinkContainer from './components/LinkContainer';

test('renders Add a new url link', () => {
  const { getByText } = render(<LinkContainer />);
  const linkElement = getByText(/Add a new url/i);
  expect(linkElement).toBeInTheDocument();
});

const setup = () => {
  const utils = render(<LinkContainer />)
  const inputs = utils.getAllByRole('textbox')
  const table = utils.getAllByRole('table')
  const submit = utils.getAllByRole('button')
  return {
    inputs,
    table,
    submit,
    ...utils,
  }
}

test('Updating name input updates table', () => {
  const { inputs, getByRole, getAllByRole, queryAllByRole, getByText, table, submit } = setup()
  console.log(inputs.length)
  fireEvent.change(inputs[0], { target: { value: 'Github' } })
  fireEvent.change(inputs[1], { target: { value: 'https://www.github.com' } })

  // expect(inputs[0].value).toBe('Github') //empty after
  fireEvent.click(getByText('Submit'), submit)

  fireEvent.change(inputs[0], { target: { value: 'Cam' } })
  fireEvent.change(inputs[1], { target: { value: 'https://www.ayocamo.com' } })

  // expect(inputs[0].value).toBe('Github') //empty after
  fireEvent.click(getByText('Submit'), submit)

  expect(getAllByRole('row')).toHaveLength(3)
})

test('Clicking remove deletes row in table', () => {
  const { inputs, getAllByRole, queryAllByRole, getByText, table, submit } = setup()

  fireEvent.change(inputs[0], { target: { value: 'Github' } })
  fireEvent.change(inputs[1], { target: { value: 'https://www.github.com' } })

  // expect(inputs[0].value).toBe('Github') //empty after
  fireEvent.click(getByText('Submit'), submit)

  fireEvent.click(getByText('Delete'))

  expect(getAllByRole('row')).toHaveLength(1)


  fireEvent.change(inputs[0], { target: { value: 'Cam' } })
  fireEvent.change(inputs[1], { target: { value: 'https://www.ayocamo.com' } })

  // expect(inputs[0].value).toBe('Github') //empty after
  fireEvent.click(getByText('Submit'), submit)

  fireEvent.click(getByText('Delete'))


  expect(getAllByRole('row')).toHaveLength(1)

})