import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/ifo7xry.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
