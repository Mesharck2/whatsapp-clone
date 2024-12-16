"use client";


"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
// import { Auth0Provider } from "@auth0/auth0-react";
import { ConvexReactClient } from "convex/react";
// import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      // domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      // clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      // authorizationParams={{
      //   redirect_uri:
      //     typeof window === "undefined" ? undefined : window.location.origin,
      // }}
      // useRefreshTokens={true}
      // cacheLocation="localstorage"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}




// import { ConvexReactClient } from "convex/react";
// import { ReactNode } from "react";
// import {ClerkProvider, useAuth} from "@clerk/nextjs";
// import { ConvexProviderWithClerk } from "convex/react-clerk";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return (
//     <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//       <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//         {children}
//       </ConvexProviderWithClerk>
      
//     </ClerkProvider>
//   );
// }