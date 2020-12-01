import React from 'react'
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Tests on LoginScreen', () => {
    const contextValue = {
        dispatch: jest.fn()
    }

    const history = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value = { contextValue }>
            <LoginScreen history = { history }/>
        </AuthContext.Provider>
    );

    test('should shown correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should run the Dispatch and the navigation', () => {

        wrapper.find('button').simulate('click');

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'JapcDev'
            }
        });

        expect ( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');

        wrapper.find('button').simulate('click');

        expect ( history.replace ).toHaveBeenCalledWith('/dc');

    });
})
