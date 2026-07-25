import React from 'react' ;
import Hero from '../components/Hero' ;
import Features from '../components/Features';
import Subjects from '../components/Subjects' ;
import FeaturedTutors from '../components/FeaturedTutors' ;
import About from '../components/About';

function Home() {
  return (
    <>
    <Hero />
    <Features />
    <Subjects />
    <FeaturedTutors />
    <About />

    </>
  )
}

export default Home