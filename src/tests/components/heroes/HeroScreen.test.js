import React from 'react'
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';


describe('Tests on <HeroScreen />', () => {


    let historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('should shown the redirect component if there are no arguments in the Url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {['/hero']}>
                <HeroScreen history = { historyMock }/>
            </MemoryRouter>
        );

        //Dos manera de hacerlo, que pinte el componete vacio.
        expect( wrapper ).toMatchSnapshot();

        // Que muestre el componente Redirect
        expect( wrapper.find('Redirect').exists()).toBe(true);
    })

    test('should shown a hero if the params exist', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component = { HeroScreen }/>
            </MemoryRouter>
        );

        expect( wrapper.find('h3').exists()).toBe(true);
    })

    test('should return to before screen', () => {
        historyMock.length = 1;

        const wrapper = mount(
            <MemoryRouter initialEntries = {['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component = { (props) => <HeroScreen history = { historyMock }/> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalledWith();
    })

    test('should return to before screen called goBack without arguments', () => {
        historyMock.length = 10;

        const wrapper = mount(
            <MemoryRouter initialEntries = {['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component = { (props) => <HeroScreen history = { historyMock }/> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).not.toHaveBeenCalled();
        expect( historyMock.goBack ).toHaveBeenCalled();
    })

    test('should called the redirect if hero not exist', () => {
        historyMock.length = 10;

        const wrapper = mount(
            <MemoryRouter initialEntries = {['/hero/hero-que-no-existe']}>
                <Route
                    path="/hero/:heroId"
                    component = { (props) => <HeroScreen history = { historyMock }/> }
                />
            </MemoryRouter>
        );

        // console.log(wrapper.html());
        expect( wrapper.text()).toBe('');
    })
});