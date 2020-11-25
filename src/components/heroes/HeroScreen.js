import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroesById';

export const HeroScreen = ( { history }) => {

	// const params = useParams();
	// console.log(params);
	const { heroId } = useParams();


	// Memorizamos el resultado siempre y cuando las dependencias se mantenga igual.
	const hero = useMemo( () => getHeroesById( heroId ), [ heroId ]);
	// const hero = getHeroesById(heroId);

	console.log(hero);

	if (!hero) {
		return <Redirect to="/" />
	}

	const {
		superhero,
		publisher,
		alter_ego,
		first_appearance,
		characters
	} = hero;

	const handleReturn = () => {

		if( history.length <= 2) {
			history.push('/')
		} else {
			history.goBack();
		}
	}

	return (
		<div className="container">
			<div className="row mt-5">
				<div className="col-4">
					<img className="img-thumbnail animate__animated animate__fadeIn" src={`../assets/heroes/${heroId}.jpg`} alt={superhero}/>
				</div>


				<div className="col-8 animate__animated animate__fadeIn">
					<h3>{superhero}</h3>
					<ul className="list-group list-group-flush">
						<li className="list-group-item"><b>Alter ego:</b> {alter_ego}</li>
						<li className="list-group-item"><b>Publisher:</b> {publisher}</li>
						<li className="list-group-item"><b>First Appearance:</b> {first_appearance}</li>
					</ul>

					<h5>Characters</h5>
					<p>{characters}</p>
					<button
						className="btn btn-outline-info btn-sm"
						onClick={ handleReturn }
					>
						Volver
					</button>
				</div>
			</div>
		</div>
	)
}
