import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export default function Page() {
  return(
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 '>
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className='text-center pt-16 space-y-4'>
          <h1 className='font-bold text-3xl text-[#2E2A47]'>
            Welcome Back!!
          </h1>
          <p className='text-base text-[#7EBCA0]'>
            Log in or create account to get back to your dashboard!!
          </p>
        </div>
        <div className='flex items-center justify-center mt-8'>
          <ClerkLoaded>
            <SignUp/>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin text-muted-foreground'/>
          </ClerkLoading>
          </div> 
      </div>
            <div className='h-full bg-red-900 hidden lg:block items-center justify-center'>
              <div className='flex justify-center items-center mt-[270px]'>
              <Image src="/logo.svg" width={100} height={100} alt="logo"/>
              </div>
              
            </div>
    </div>
  )
};