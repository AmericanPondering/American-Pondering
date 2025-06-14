import { useState } from "react"

import * as copy from "./copy/teaser-page"

import ListForm from "./components/ListForm"

import styles from './App.module.scss'
import IMAGES from './Images'

export default function App() {
  return (
    <div className={styles.mainContainer}>
      {/* Landing elements */}
      <div className={styles.welcomeContainer}>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.landingParagraph}>{copy.landing_paragraph}</p>
        <img
          src={IMAGES.coverImage}
          alt="Cover image"
          onLoad={() => document.querySelector("body").style.animation = "pageLoad 1s ease-out, 2s"}
          className={styles.coverImage}
        />
      </div>

      {/* Text */}
      <ReadMore height="25rem">
        <TextSection>
          <h2>{copy.debut_heading}</h2>
          <h3>{copy.debut_subheading}</h3>
        </TextSection>

        <TextSection>
          <p>
            <strong>{copy.debut_paragraph1[0]}</strong>
            {copy.debut_paragraph1[1]}
          </p>
        </TextSection>

        <TextSection>
          <p>{copy.debut_paragraph2}</p>
        </TextSection>

        <TextSection>
          <p>
            <em>{copy.debut_paragraph3[0]}</em>
            {copy.debut_paragraph3[1]}
            <em>{copy.debut_paragraph3[2]}</em>
          </p>
        </TextSection>

        <TextSection>
          {copy.debut_paragraph4[0]}
          <strong>{copy.debut_paragraph4[1]}</strong>
          {copy.debut_paragraph4[2]}
        </TextSection>

        <TextSection>
          {copy.debut_paragraph5}
        </TextSection>
      </ReadMore>

      {/* Form */}
      <ListForm />

      {/* Artist section */}
      <ReadMore height="16rem">
        <TextSection>
          <h2>{copy.artistIntro_heading}</h2>
          <img
            src={IMAGES.artist}
            alt="Artist"
            className={styles.artistImage}
          />
          <p>{copy.artistIntro_paragraph}</p>
        </TextSection>
      </ReadMore>

      {/* Contact */}
      <div className={styles.contentContainer}>
        <TextSection>
          <p style={{ fontSize: "0.8rem" }}>{copy.contactInfo[0]}</p>
          <a href="mailto:admin@americanpondering.com" style={{ fontSize: "0.8rem" }}>{copy.contactInfo[1]}</a>
          <p style={{ fontSize: "0.8rem" }}>{copy.contactInfo[2]} <a href="https://americanpondering.com">{copy.contactInfo[3]}</a></p>
        </TextSection>
      </div>
    </div>
  );
}

function TextSection({ children }) {
    return (
        <div className={styles.textSection}>{children}</div>
    );
}

function ReadMore({ children, height }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{ ...(!isExpanded && { height }) }}
      className={isExpanded ? styles.readMoreContainerExpanded : styles.readMoreContainerCollapsed}
    >
      {children}
      <button onClick={() => setIsExpanded(true)} className={styles.readMoreButton}>Read more</button>
    </div>
  );
}