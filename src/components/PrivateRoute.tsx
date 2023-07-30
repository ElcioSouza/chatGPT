import React, { ReactNode, useEffect } from "react";

import { APP_ROUTES } from "@/constants/app-routes";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { push } = useRouter();

  const { isSignedIn, isFetchedActiveCustomer } = useActiveCustomer();

  useEffect(() => {
    if (!isSignedIn && isFetchedActiveCustomer) {
      push(APP_ROUTES.public.login);
    }
  }, [isSignedIn, isFetchedActiveCustomer, push]);
  return (
    <>
      {!isSignedIn && (
        <div className="flex p-20 justify-center">
          <span className="circle animate-loader"></span>
          <span className="circle animate-loader animation-delay-200"></span>
          <span className="circle animate-loader animation-delay-400"></span>
        </div>
      )}
      {isSignedIn && children}
    </>
  );
}
