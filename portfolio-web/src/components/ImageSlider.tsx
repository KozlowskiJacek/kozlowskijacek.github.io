import React from 'react'

const images = [
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
  "../assets/img/test.jpg",
]


export default const ImageSlider = () => {
  return (
    <div className="relative h-[10rem] w-full mx-auto overflow-hidden rounded-full top-[5rem] 
        before:absolute before:left-0 before:top-0 before:h-full before:w-[15%] before:z-2 
        before:content-[''] before:bg-gradient-to-r before:from-[#323946] before:to-transparent 
        after:absolute after:right-0 after:top-0 after:h-full after:w-[15%] after:z-2 after:content-[''] 
        after:bg-gradient-to-r after:from-[#323946] after:to-transparent after:rotate-180">
      <div className='group flex w-[calc(250px*8)] animate-scroll hover:[animation-play-state:paused]'>
        {images.map((src, i) =>(
          <div key={i} className='h-[200px] w-[250px] flex items-center p-[15px] [perspective:100px]'>
            <img className="transition duration-400 group-hover:[transform:translateZ(20px)]" src={src} alt={`Image ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

