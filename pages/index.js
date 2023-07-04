import Layout from '@/Components/Layout'
import { useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image';

function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className='flex font-bold'>
        Hello {session?.user?.name}
        <div className=' absolute right-4 top-4' ><Image className=' right-0 t-0 rounded-full' width={30} height={30} src={session?.user.image} alt={"user"} /></div>
      </div>
    </Layout>
  )
}

export default Home