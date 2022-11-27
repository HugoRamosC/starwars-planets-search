import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import orderMock from './orderMock';

describe('Testa o componente Form', () => {
  afterEach(() => jest.clearAllMocks());

  test('01 - Testa se o input Filtro é atualizado ao receber modificação', async () => {
    global.fetch = (url) => {
      return Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    }
    render(<App />);

    await waitFor(() => {
      const names = screen.getAllByTestId('planet-name')
      expect(names).toBeDefined();
      const inptName = screen.getByRole('textbox', { name: /nome:/i });
      userEvent.type(inptName, 't');
      expect(names).toHaveLength(3);
    })
  });
  test('02 - Testa se o input Order é atualizado ao receber modificação', async () => {
    global.fetch = (url) => {
      return Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    }
    render(<App />);

    await waitFor(() => {
      const radioASC = screen.getByRole('radio', { name: /ascendente/i })
      expect(radioASC).toBeDefined();
      userEvent.click(radioASC);
      expect(radioASC).toBeChecked();
    })
  });
  test('03 - Testa se um filtro é aplicado e deletado', async () => {
    global.fetch = (url) => {
      return Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    }
    render(<App />);

    const btnFilter = screen.getByRole('button', { name: /filtrar/i })
    userEvent.click(btnFilter);
    expect(screen.getByText(/population maior que 0/i)).toBeDefined();

    const btnDelFilter = screen.getAllByRole('button', { name: /❌/i })
    userEvent.click(btnDelFilter[0]);
    expect(screen.queryByText(/population maior que 0/i)).toBeFalsy();
  });
  test('04 - Testa a ordenação', async () => {
    global.fetch = (url) => {
      return Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    }
    render(<App />);

    // userEvent.upload(
    //   screen.getAllByRole('option', { id: /population/i })[1],
    //   'orbital_period',
    // );
    // await waitFor(() => {
    userEvent.selectOptions(screen.getAllByRole('combobox')[2], ['rotation_period'])
    userEvent.click(screen.getByRole('radio', { name: /descendente/i }));
    userEvent.click(screen.getByRole('button', { name: /ordenar/i }));
    const planetName = await screen.findAllByTestId('planet-name');
    console.log(planetName[0]);
    expect(planetName[0]).toHaveTextContent('Kamino')
    //   const table = screen.findAllByRole('cell')
    //     // .getAllByTestId('planet-name')[0]).toHaveTextContent(/coruscant/i);
    // })
  });
});
