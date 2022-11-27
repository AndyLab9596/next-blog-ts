import React from 'react'
import classes from './hero.module.css';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/tangwei.jpeg" alt="My Image" width={300} height={300} />
            </div>
            <h1>Hi, I&apos;m Tang Wei</h1>
            <p>I blog about web development - especially frontend frameworks like Angular or React.</p>
        </section>
    )
}

export default Hero