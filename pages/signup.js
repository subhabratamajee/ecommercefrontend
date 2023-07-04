

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
export default function Home() {
  const router=useRouter()
  const { data: session } = useSession()
  if(!session) {
  return (
    <div className='bg-blue-900 w-screen h-screen flex'>
      <div className='items-center m-auto'>
        <button className='text-slate-800 bg-white p-2 rounded-xl font-semibold ' onClick={() => signIn('google')}>Login with Google</button>
      </div>

    </div>
  )}
  return(router.push('/'))
}
