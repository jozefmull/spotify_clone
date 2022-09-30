import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

import { Navigation } from 'swiper';
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
                    <h2 className='text-2xl font-semibold'>{genre.title}</h2>
                    <img src={genre.image} alt="genre_image"/>
                </SwiperSlide>
            ))
        )
    }

  return (
    <>
        <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={7}
            navigation
            // resposive="true"
            loop={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 2,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 3,
                },
                1024:{
                    slidesPerView: 3,
                },
                1280:{
                    slidesPerView: 4,
                },
                1350:{
                    slidesPerView: 5,
                },
                1536:{
                    slidesPerView: 6,
                }
              }}
        >
        {genresRender()} 
        </Swiper>
    </>
  )
}

export default Genres