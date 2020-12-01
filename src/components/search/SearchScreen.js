import React, { useMemo } from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    // console.log(location.search);

    // https://www.npmjs.com/package/query-string
    // console.log(queryString.parse(location.search));
    // Se indica por defecto '' vacio para que no muestre undefine en el caso que no tenga valor.
    const { q = '' } = queryString.parse(location.search);
    // console.log(q);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });
    const { searchText } = formValues;

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${ searchText }`);
    }

    const heroesFiltered = useMemo(() => getHeroesByName(q), [ q ]);

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr/>

                    <form onSubmit = { handleSearch }>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Find your Hero"
                            autoComplete= "off"
                            onChange = { handleInputChange }
                            name = "searchText"
                            value = { searchText }

                        />

                            <button
                                type="submit"
                                className="btn m-1 btn-block btn-outline-primary"
                            >
                                Search...
                            </button>
                    </form>

                </div>


                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {

                        (q === '')
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {

                        (q !== '' && heroesFiltered.length === 0)
                            &&
                            <div className="alert alert-danger">
                                There is not a hero with {q}
                            </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} { ...hero } />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
