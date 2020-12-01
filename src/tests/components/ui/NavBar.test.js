import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { Navbar } from '../../../components/ui/Navbar';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';


describe('Tests on <NavBar />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Bitcero'
        }
    }


    //Falsear el history para la prueba
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter>
                <Router history= { historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    // Para limpiar el mock para cada prueba.
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should shown correctly', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim()).toBe('Bitcero');
    });

    test('should called logout and use the history custom hook', () => {
        // wrapper.find('button').simulate('click');
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        })

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');

    });
})
