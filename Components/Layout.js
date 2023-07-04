import React from 'react'
import Nav from './Nav'
import { useSession,signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

function Layout({children}) {

  const {data:session} = useSession();
  const router= useRouter();

if(!session) return(
  <div className='bg-blue-900 w-screen h-screen flex'>
      <div className='items-center m-auto'>
        <button className='text-slate-800 bg-white p-2 rounded-xl font-semibold ' onClick={() => signIn('google')}>Login with Google</button>
      </div>

    </div>
)

  return (
    <div className='bg-blue-900 h-screen w-screen flex '>
    <Nav/>
    <div className=' bg-white text-blue-700 flex-grow m-2 ml-2 md:ml-0 rounded-md p-4 overflow-y-scroll no-scrollbar -left-full'>
        {children}
    </div>
  </div>
  )
}

export default Layout