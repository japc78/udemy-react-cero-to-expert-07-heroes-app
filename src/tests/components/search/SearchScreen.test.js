import React from 'react';
import '@testing-library/jest-dom'
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Tests on <SearchScreen />', () => {


    test('should shown correctly with default values', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries = {['/search']}>
                <Route path = "/search" component = { SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('should shown to Batman and input with the value of queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {['/search?q=batman']}>
                <Route path = "/search" component = { SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value')).toBe('batman');
        expect( wrapper).toMatchSnapshot();
    });

    test('should shown an error if the hero is not found', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {['/search?q=heronoexiste']}>
                <Route path = "/search" component = { SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim()).toBe('There is not a hero with heronoexiste');
        expect( wrapper).toMatchSnapshot();
    });

    test('should call the push of history', () => {
        const historyMock = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries = {['/search?q=heronoexiste']}>
                <Route
                    path = "/search"
                    component = { () => <SearchScreen history = { historyMock}/> }
                />
            </MemoryRouter>
        );

        // Simulacion de escritura en el input.
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        //Simulacion del submit del formulario.
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( historyMock.push ).toHaveBeenCalledWith('?q=batman');
    })
})
