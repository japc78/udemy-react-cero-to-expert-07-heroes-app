import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

	// Memorizamos el resultado siempre y cuando las dependencias se mantenga igual.
	const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);
	// const heroes = getHeroesByPublisher( publisher);

	return (
		<div className='card-columns animate__animated animate__fadeIn'>
			{
				heroes.map( hero => <HeroCard key= {hero.id} { ...hero }/>)
			}
		</div>
	)
}
