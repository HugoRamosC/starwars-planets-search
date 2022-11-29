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

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    const iptsColumn = screen.getAllByRole('combobox');
    
    userEvent.click(btnFilter);
    expect(screen.queryByText(/population maior que 0/i)).toBeDefined();
    expect(iptsColumn[0].value).toBe('orbital_period');
    expect(iptsColumn[0].children).toHaveLength(4);
    
    userEvent.selectOptions(iptsColumn[0], 'rotation_period');
    userEvent.selectOptions(iptsColumn[1], 'menor que');
    userEvent.type(screen.getByRole('spinbutton', { name: /número:/i }), 24);
    userEvent.click(btnFilter);
    expect(screen.queryByText(/rotation_period menor que 24/i)).toBeDefined();
    expect(iptsColumn[0].value).toBe('orbital_period');
    expect(iptsColumn[0].children).toHaveLength(3);
    
    userEvent.selectOptions(iptsColumn[0], 'orbital_period');
    userEvent.selectOptions(iptsColumn[1], 'igual a');
    userEvent.type(screen.getByRole('spinbutton', { name: /número:/i }), '304');
    userEvent.click(btnFilter);
    expect(screen.queryByText(/orbital_period igual a 304/i)).toBeDefined();
    expect(iptsColumn[0]).toHaveTextContent(/diameter/i);
    expect(iptsColumn[0].children).toHaveLength(2);
    
    const btnDelFilter = screen.getAllByRole('button', { name: /❌/i })
    userEvent.click(btnDelFilter[0]);
    expect(screen.queryByText(/population maior que 0/i)).toBeFalsy();
    expect(screen.queryByText(/orbital_period igual a 304/i)).toBeDefined();
    expect(screen.queryByText(/rotation_period menor que 24/i)).toBeDefined();
    expect(iptsColumn[0].value).toBe('population');
    expect(iptsColumn[0].children).toHaveLength(3);

    userEvent.click(screen.getByRole('button', { name: /limpar filtros & ordem/i }));
    expect(screen.queryByText(/population maior que 0/i)).toBeFalsy();
    expect(screen.queryByText(/orbital_period igual a 304/i)).toBeFalsy();
    expect(screen.queryByText(/rotation_period menor que 24/i)).toBeFalsy();
    expect(iptsColumn[0].value).toBe('population');
    expect(iptsColumn[0].children).toHaveLength(5);
  });
  test('04 - Testa a ordenação', async () => {
    global.fetch = (url) => {
      return Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    }
    // const sortPlanets = jest.fn().mockReturnValue(orderMock);
    render(<App />);

    // await waitFor(() => {
    const comboboxes = screen.getAllByRole('combobox')
    userEvent.selectOptions(comboboxes[2], 'surface_water')
    userEvent.click(screen.getByRole('radio', { name: /descendente/i }));
    userEvent.click(screen.getByRole('button', { name: /ordenar/i }));
    // sortPlanets();
    const planetName = await screen.findAllByTestId('planet-name');
    // console.log(planetName[0]);
    expect(planetName[0]).toHaveTextContent('Hoth')

    // expect(sortPlanets).toBeCalled();
    // expect(sortPlanets()).toBe(orderMock);
    //   const table = screen.findAllByRole('cell')
    //     // .getAllByTestId('planet-name')[0]).toHaveTextContent(/coruscant/i);
    // })
  });
});
