import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
const AdminEmail='jhs1941jhs@gmail.com'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/Mongodb"


export const AuthOptions={
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks:{
    session:({session,token,user})=>{
      if(AdminEmail===session?.user?.email){
        return session;
      }else{
        return false
      }
    }
  }
}

export default NextAuth(AuthOptions);

export async function IsAdmin(req,res){
  const session= await getServerSession(req,res,AuthOptions);
  if(!AdminEmail.includes(session?.user?.email)){
    res.status(401);
    res.end();
    throw 'You are not an admin'
  }

}