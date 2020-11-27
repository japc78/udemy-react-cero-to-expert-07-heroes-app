import '@testing-library/jest-dom';
import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';


describe('Test on authReducer', () => {
    test('should return default state', () => {
        const state = authReducer( { logged: false }, {});
        expect(state).toEqual( { logged: false });
    })

    test('should authenticate and put the user name', () => {
        const action = {
            type: types.login,
            payload: {
                name:'Bitcero'
            }
        }

        const state = authReducer({ logged:false }, action);
        // console.log(state);
        expect( state ).toEqual({
            logged: true,
            name: 'Bitcero'
        });
        // expect(state.logged).toBe(true);
        // expect(state.name).toEqual('Bitcero');
    })

    test('should delete the name and put logged on false', () => {
        const action = {
            type: types.logout,
        }

        const state = authReducer( {logged: true, name: 'Bitcero'}, action );
        expect( state ).toEqual({ logged: false });
    })
})
