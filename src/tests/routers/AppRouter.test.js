import React from 'react'
import { mount } from 'enzyme'
import { AppRouter } from '../../routers/AppRouter'
import { AuthContext } from '../../auth/AuthContext'

describe('Test on <AppRouter />', () => {

    test('should shown the login if it is not authenticated', () => {

        // Contexto inicial para la prueba.
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
    });

    test('should shown Marvel component if it is authenticated', () => {
        // Contexto inicial para la prueba.
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Bitcero'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        // console.log(wrapper.html());
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });

})
