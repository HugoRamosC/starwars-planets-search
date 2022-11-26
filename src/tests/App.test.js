import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/StarWarsProvider'
import mockData from '../../cypress/mocks/fetch';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Form', () => {
  test('Testa se o input Filtro é atualizado ao receber modificação', () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(<AppProvider><App /></AppProvider>);

    const inptName = screen.getByRole('textbox', { name: /nome:/i });
    userEvent.type(inptName, 't');
    // screen.getAllByTestId('planet-name')
    expect(screen.getByRole('cell', { name: /coruscant/i })).toHaveLength(3);
  });
});
