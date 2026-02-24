import React, { useState } from 'react'
import {motion} from 'motion/react'
import LoginModel from '../components/LoginModel';


const Home = () => {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
        <motion.div className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
            initial={{y: -40, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5, ease: 'easeInOut'}}
        >
            <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                <div className='text-lg font-semibold'>
                    GenWeb.ai
                </div>
                <div className='flex items-center gap-5'>
                    <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'>
                        Pricing
                    </div>
                    <button
                    className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm'
                    onClick={() => setOpenLogin(true)}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </motion.div>

        <section className='pt-44 pb-32 px-6 text-center'>
            <motion.h1
                className='text-5xl md:text-7xl font-bold leading-tight'
                initial={{y: 40, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, ease: 'easeInOut', delay: 0.2}}
            >
                Build Stunning Website <br />
                <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>With AI</span>
            </motion.h1>
            <motion.p
                className='mt-8 text-lg text-zinc-400 max-w-2xl mx-auto'
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, ease: 'easeInOut', delay: 0.3}}
            >
                Describe your idea and let AI generate a modern, responsive, production-ready website.
            </motion.p>

            <motion.div
                className='mt-12'
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, ease: 'easeInOut', delay: 0.4}}
            >
                <button className='px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:opacity-90 transition-opacity'>
                    Get Started
                </button>
            </motion.div>
        </section>

        <section className='max-w-7xl mx-auto px-6 pb-32'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {highlights.map((h,i) => (
                    <motion.div 
                        key={i}
                        className='rounded-2xl bg-white/5 border border-white/10 p-8'
                        initial={{y: 40, opacity: 0}}
                        whileInView={{y: 0, opacity: 1}}
                        >
                        <h1 className='text-xl font-semibold mb-3'>{h}</h1>
                        <p className='text-sm text-zinc-400'>
                            GenWeb.ai builds real websites - clean code,
                            animation, responsiveness and scalable structure.
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>

        <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
            &copy; {new Date().getFullYear()} GenWeb.ai All rights reserved.
        </footer>

        {openLogin && <LoginModel open = {openLogin} onClose = {() => setOpenLogin(false)} />}

    </div>
  )
}

export default Home