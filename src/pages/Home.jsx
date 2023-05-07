import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("pokedex")
    }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
        {/* Encabezado de bienvenida */}
        <section className='grid justify-center text-center items-center px-2'>
            <article className='grid gap-2 justify-center'>
                <div>
                    <img src="/images/img-pokedex.png" alt="" />
                </div>
                <h2 className='text-[#FE1936] text-3xl font-bold'>¡Hello trainer!</h2>
                <p className='font-medium text-lg'>Give me your name to start!</p>
                <form className='flex gap-1 justify-center' onSubmit={handleSubmit}>
                    <input className='outline-none shadow-sm ' id="nameTrainer" type="text" placeholder='Your name...' />
                    <button className='bg-[#D93F3F] text-white py-2 px-8 text-xl rounded-md'>Start!</button>
                </form>
            </article>
        </section>
        {/* Footer */}
        <Footer />
    </section>
  )
}

export default Home