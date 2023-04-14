import React, { useEffect, useState } from 'react'
import styles from './styles/mainStyles.module.css'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import Pokeball from './pokeball.svg'
export default function Main() {

    const imgStyle = { width: '100px', height: '100px' };
    const imgPokeballStyle = { width: '30px', height: '30px' }
    const hpSize = { fontSize: '0.7em', paddingRight: '3px' };

    const [searchTerm, setSearchTerm] = useState("");
    const [cont, setCont] = useState(1);

    const [pokemonDados, setPokemonDados] = useState({
        id: '',
        name: '',
        src: '',
        atk: '',
        def: '',
        hp: '',
        speed: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        renderPokemon(searchTerm);
        setSearchTerm('')

    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };




    const fetchPokemon = async (pokemon) => {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await APIResponse.json()
        return data;
    }
    const renderPokemon = async (pokemon) => {

        const data = await fetchPokemon(pokemon);
        const stats = data.stats;
        const atk = stats[1].base_stat; // ataque
        const def = stats[2].base_stat; // defesa
        const hp = stats[0].base_stat; // saúde
        const speed = stats[5].base_stat; // velocidade
        let nome = data.name;
        nome = nome.slice(0, 1).toUpperCase() + nome.slice(1);
        setPokemonDados({
            id: data.id,
            name: nome,
            src: data['sprites']['other']['dream_world']['front_default'],
            atk,
            def,
            hp,
            speed

        })

    }

    function atualizarContador(aux) {
        if (cont + aux >= 1) {
            setCont(cont + aux);
        }
    }

    useEffect(() => {
        renderPokemon(cont)
    }, []);

    useEffect(() => {
        renderPokemon(cont)
    }, [cont]);

    return (
        <div className={styles.principal}>
            {searchTerm}
            <div className={styles.container}>
                <div onClick={() => atualizarContador(-1)} className={styles.btnLeft}><AiOutlineArrowLeft /></div>
                <div className={styles.card}>
                    <div className={styles.hp}><span style={hpSize}>HP </span>{pokemonDados.hp}</div>
                    <div className={styles.img}>
                        {pokemonDados.src !== '' ? <img style={imgStyle} src={pokemonDados.src} alt="Imagem Pokemon" /> : ''}
                    </div>
                    <div className={styles.name}>
                        <h2 className={styles.h2_name} >{pokemonDados.name}</h2>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.cardInfo}>
                            <div className={styles.positionAttachments}>
                                <div className={styles.attachments}>{pokemonDados.atk}</div>
                                <span className={styles.ref}>Ataque</span>
                            </div>
                            <div className={styles.positionAttachments}>
                                <div className={styles.attachments}>{pokemonDados.def}</div>
                                <span className={styles.ref}>Defesa</span>
                            </div>
                            <div className={styles.positionAttachments}>
                                <div className={styles.attachments}>{pokemonDados.speed}</div>
                                <span className={styles.ref}>Velocidade</span>
                            </div>


                        </div>

                    </div>
                </div>
                <div onClick={() => atualizarContador(1)} className={styles.btnRight}><AiOutlineArrowRight /></div>
            </div>
            <div className={styles.pesquisa}>
                <form onSubmit={handleSubmit}>
                    <div classname={styles.search_box}>
                        <button className={styles.btn_search} type="submit"><img style={imgPokeballStyle} src={Pokeball} alt="Pokeball imagem" /> </button>
                        <input type="text" className={styles.input_search} value={searchTerm} placeholder="Type to Search..." onChange={handleChange} />

                    </div>
                </form>
            </div>
        </div>
    )
}