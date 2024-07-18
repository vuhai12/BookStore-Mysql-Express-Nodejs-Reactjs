import React from "react";
import Slider from "react-slick";
import LeftArrow from "../../assets/left-arrow.svg"
import RightArrow from "../../assets/right-arrow.svg"
import slider1 from "../../assets/slider1.jpg"
import slider2 from "../../assets/slider2.jpg"
import slider3 from "../../assets/slider3.png"

const SliderComponent = () => {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} className="bg-gray-300 absolute left-[50px] z-50 top-[50%] translate-y-[-50%]
        w-[50px] h-[50px] rounded-[50%] p-[10px]
        "/>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} className="bg-gray-300 absolute right-[50px] z-50 bottom-[50%] translate-y-[50%]
         w-[50px] h-[50px] rounded-[50%] p-[10px]
        "/>
    );
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             initialSlide: 2
        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ]
    };
    return (
        <div className="w-full absolute h-[320px] ">
            <Slider {...settings}
                className=" h-[320px] "
            >
                <div className="bg-slate-700 h-[320px]">
                    <img src={slider1} className="w-full h-full object-cover"/>
                </div>
                <div className="bg-red-600 h-[320px]">
                <img src={slider2} className="w-full h-full object-cover"/>
                </div>
                <div className="bg-slate-500 h-[320px]">
                <img src={slider3} className="w-full h-full object-cover"/>
                </div>
            </Slider>
        </div>
    )
}

export default SliderComponent