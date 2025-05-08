"use client";
import { LoadingPage } from '@/components/loading';
import { Navbar } from '@/components/navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if ((userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname.startsWith("/"))
      ) {
        router.push(
          "/managers/properties",
          { scroll: false }
        );
      } else {
        setIsLoading(false)
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoding) return <><LoadingPage/></>;
  return (
    <div className='size-full'>
      <Navbar />
      <main className={`h-full flex w-full flex-col`} style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
        {children}
      </main>
    </div>
  )
}

export default Layout