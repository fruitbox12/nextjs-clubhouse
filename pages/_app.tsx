import App, { AppContext } from 'next/app';
import withRedux from 'next-redux-wrapper'
import '../styles/globals.scss';
import { makeStore } from '../redux/store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default withRedux(makeStore)(MyApp);
