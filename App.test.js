import React from 'react';
import { render, queries, screen, fireEvent, within } from '@testing-library/react';
import LinkContainer from './components/LinkContainer';

import {getAllRowsByRowgroupType} from 'testing-library-table-queries'

// const customRender = (ui, options) =>
//   render(ui, { queries: { ...queries, ...tableQueries }, ...options })

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export { customRender as render }

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
  const { inputs, getAllByRole, queryAllByRole, getByText, table, submit } = setup()
  console.log(inputs.length)
  fireEvent.change(inputs[0], { target: { value: 'Github' } })
  fireEvent.change(inputs[1], { target: { value: 'https://www.github.com' } })

  // expect(inputs[0].value).toBe('Github') //empty after
  fireEvent.click(getByText('Add Favorite Website'), submit)

  fireEvent.change(inputs[0], { target: { value: 'Cam' } })
  fireEvent.change(inputs[1], { target: { value: 'https://www.ayocamo.com' } })

  // expect(inputs[0].value).toBe('Github') //empty after
  fireEvent.click(getByText('Add Favorite Website'), submit)

  expect(getAllByRole('row')).toHaveLength(3)

  // const tbody = getAllByRole("rowgroup")[1];
  // const utils = within(row);
  // expect(queryAllByRole('row')).toContain(1)
  // expect(utils.getByText('Github')).toBeInTheDocument();

})