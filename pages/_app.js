import { RecoilRoot } from 'recoil'
import { Global } from '@emotion/react'
import { globalStyles } from '../src/commons/globalStyles'

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
