import '@/styles/global.css'
import '@/styles/index.css'
import '@/styles/reset.css'
import {ThemeProvider} from '@emotion/react'
import dynamic from 'next/dynamic'
import Header from 'renderer/src/layout/HtmlHeader'
import {main} from 'renderer/src/styles/theme'

const TweenManager = dynamic(() => import('renderer/src/layout/TweenManager'), {
  ssr: false,
})

function App({Component, pageProps = {title: 'index'}}) {

  return (
    <ThemeProvider theme={main}>
      <Header title={pageProps.title}/>
      <TweenManager/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
