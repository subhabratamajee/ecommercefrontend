import { CartContextProvider } from '@/Components/CartContext'
import '@/styles/globals.css'



export default function App({
  Component, pageProps: {  ...pageProps }
}) {
  return (
<CartContextProvider >
  <Component {...pageProps} />
</CartContextProvider>

  )
}