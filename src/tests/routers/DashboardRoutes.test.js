import React from 'react'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Tests on <DashboardRoutes />', () => {

    // Contexto inicial para la prueba.
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'bitcero'
        }
    }

    test('Debe shown correctly', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('bitcero');
    });
})