import * as copy from "./copy/teaser-page"

import ListForm from "./components/ListForm"

import styles from './App.module.scss'
import IMAGES from './Images'

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.welcomeContainer}>
        <h1 className={styles.title}>{copy.title}</h1>
        <img
          src={IMAGES.coverImage}
          alt="Cover image"
          onLoad={() => document.querySelector("body").style.animation = "pageLoad 1s ease-out, 2s"}
          className={styles.coverImage}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textSection}>
          <h2>{copy.introHeading}</h2>
          <p>{copy.introParagraph}</p>
        </div>
      </div>

      <ListForm />

      <div className={styles.contentContainer}>
        <div className={styles.textSection}>
          <h2>{copy.artistIntroHeading}</h2>
          <img
            src={IMAGES.artist}
            alt="Artist"
            className={styles.artistImage}
          />
          <p>{copy.artistIntroParagraph}</p>
        </div>

        <div className={styles.textSection}>
          <h2>{copy.teaserHeading}</h2>
          <p>{copy.teaserParagraph}</p>
        </div>

        <div className={styles.textSection}>
          <h2>{copy.connectionHeading}</h2>
          <p>{copy.connectionParagraph}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
