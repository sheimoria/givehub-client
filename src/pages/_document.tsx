import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { RelayDocument, createRelayDocument } from 'relay-nextjs/document'

interface DocumentProps {
  relayDocument: RelayDocument
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const relayDocument = createRelayDocument()

    const renderPage = ctx.renderPage
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => relayDocument.enhance(App)
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      relayDocument
    }
  }

  render() {
    const { relayDocument } = this.props

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <relayDocument.Script />
        </body>
      </Html>
    )
  }
}
