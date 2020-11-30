import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const { mount } = require("enzyme")
const { PrivateRoute } = require("../../routers/PrivateRoute")

describe('Test on <PrivateRouter />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    // Para comprobar que el local store ha sido llamado con cietos argumentos.
    // Se simula con jest el LocalStorage
    Storage.prototype.setItem = jest.fn();

    test('should shown the component if its authenticate and save localStore', () => {

        const wrapper = mount(
            <MemoryRouter >
                <PrivateRoute
                    isAuthenticated = { true }
                    // Componente de prueba
                    component = { () => (<span>Listo!</span>) }
                    {...props}
                />
            </MemoryRouter>
        );

        console.log(wrapper.html());
        expect(wrapper.find('span').exists()).toBe(true);

        //Evaluamos el local storage
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', "/marvel");
    })

    test('should block the component if it is not authenticated', () => {

        const wrapper = mount(
            <MemoryRouter >
                <PrivateRoute
                    isAuthenticated = { false }
                    // Componente de prueba
                    component = { () => (<span>Listo!</span>) }
                    {...props}
                />
            </MemoryRouter>
        );
        expect(wrapper.find('span').exists()).toBe(false);
    })
})


