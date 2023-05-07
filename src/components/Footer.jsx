import React from 'react'

const Footer = () => {
  return (
    <section className='relative'>
        <div className='h-16 bg-[#DD1A1A]'></div>
        <div className='h-10 bg-black'></div>
        <div className='h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute bottom-0 left-1/2 -translate-x-1/2 after:content-[""] after:h-11 after:aspect-square after:rounded-full after:bg-[#212121] after:absolute after:border-[6px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'></div>
    </section>
  )
}

export default Footer