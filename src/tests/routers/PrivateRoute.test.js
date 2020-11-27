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
    })
})


