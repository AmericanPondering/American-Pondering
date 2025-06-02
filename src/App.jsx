import * as copy from "./copy/teaser-page"

function App() {
  return <>
    <h1>{copy.title}</h1>
    {/* Cover img */}
    <h2>{copy.introHeading}</h2>
    <pre>{copy.introParagraph}</pre>

    <h2>{copy.artistIntroHeading}</h2>
    <pre>{copy.artistIntroParagraph}</pre>

    <h2>{copy.teaserHeading}</h2>
    <pre>{copy.teaserParagraph}</pre>

    <h2>{copy.connectionHeading}</h2>
    <pre>{copy.connectionParagraph}</pre>
  </>;
}

export default App;
