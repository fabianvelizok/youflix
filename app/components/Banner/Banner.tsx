'use client'

import Image from 'next/image'

import Button from '../Button/Button'
import Container from '../Container/Container'
import styles from './Banner.module.css'

type BannerProps = {
  title: string
  subtitle: string
  imageUrl: string
}

const Banner = ({ title, subtitle, imageUrl }: BannerProps) => {
  const handlePlay = () => {
    console.log('Handle play')
  }

  return <section className={styles.container}>
    <div className={styles.innerContainer}>
      <Container>
        <div className={styles.information}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subtitle}>{subtitle}</h3>
          <Button className={styles.playButton} onClick={handlePlay}>
            <Image
              src="/static/play_arrow.svg"
              height={20}
              width={20}
              alt="Play icon"
            />
            <span>Play</span>
          </Button>
        </div>
      </Container>

      <Image
        src={imageUrl}
        alt="Banner image"
        // TODO: Check sizes
        width={1000} 
        height={1000}
        className={styles.image}
      />
    </div>
  </section>
}

export default Banner