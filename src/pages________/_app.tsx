import "@/styles/globals.css";
import "material-symbols";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ActiveCustomerProvider } from "@/contexts/ActiveCustomerContext";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { MainLayout } from "@/layouts/main";
import { OrderProvider } from "@/contexts/OrderContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, staleTime: 5 * 1000 } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ActiveCustomerProvider>
          <ProductsProvider>
            <OrderProvider>
              <CartProvider>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </CartProvider>
            </OrderProvider>
          </ProductsProvider>
        </ActiveCustomerProvider>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
