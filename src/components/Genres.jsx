import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

import {FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

import {genres} from '../assets/constants'

import styles from '../css/Genres.module.css'

const Genres = () => {
    const {getWorldChartsByGenre, changeGenre} = useContext(GlobalContext)

    const handleChange = (e) => {
        let newTitle = e.target.ariaLabel
        let newValue = e.target.ariaHidden

        changeGenre({
            title: newTitle,
            value: newValue
        })
        getWorldChartsByGenre(newValue)
    }

    const genresRender = () => {
        return (
            genres.map((genre) => (
                <SwiperSlide className={`${styles.slide} animate-slideup`} key={genre.value} aria-label={genre.title} aria-hidden={genre.value} style={{backgroundColor: genre.background}} onClick={(e) => handleChange(e)}>
                    <h2 className='text-xl font-semibold'>{genre.title}</h2>
                    <img src={genre.image} alt="genre_image"/>
                </SwiperSlide>
            ))
        )
    }

  return (
    <>
        <Swiper
        slidesPerView='auto'
        spaceBetween={10}
        loop={true}
        modules={[Navigation, FreeMode]}
        navigation
        freeMode
        responsive='true'
            breakpoints={{
                100:{
                    slidesPerView:1
                },
                325:{
                    slidesPerView: 2,
                },
                450: {
                  slidesPerView: 3,
                },
                600:{
                    slidesPerView: 4,
                },
                1150:{
                    slidesPerView: 5,
                },
                1350:{
                    slidesPerView: 6,
                },
                1536:{
                    slidesPerView: 7,
                }
              }}
        >
        {genresRender()} 
        </Swiper>
    </>
  )
}


export default Genres
