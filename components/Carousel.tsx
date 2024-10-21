'use client'

import 'keen-slider/keen-slider.min.css'
import {  useKeenSlider } from 'keen-slider/react'
import React from 'react'
import { AppProps } from 'types'

type Props = {} & AppProps

const CarouselComponent = ({ children, ...rest }: Props) => {
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slideChanged() {
                console.log('slide changed')
            },
        },
        [
            // add plugins here
        ]
    )

    return (
        <div ref={sliderRef} className="keen-slider w-[500px] h-[500px] overflow-hidden">
            {React.Children.map(children, child => <div className='keen-slider__slide w-full h-full'>{child}</div>)}
        </div>
    )
}

export default CarouselComponent