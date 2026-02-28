import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Layout } from "./Layout"
import { HomePage, AboutUsPage, PageUndefined, CatalogPage, SuccessfulOrderPage } from "../pages"
import { OneProductPage } from "../pages/one-product-page/one-product-page"
import { ProfilePage } from "../pages/profile"
import { OrdersPage } from "../pages/my_orders"
import { ContactsPage } from "../pages/contacts"
import { AddressesPage } from "../pages/addresses"
import { ScrollToTop } from "../components/scrollToTop"

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* default layout */}
        <Route element={<Layout variant="default" />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<OneProductPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="profileInformation" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="addresses" element={<AddressesPage />} />
        </Route>

        {/* fullscreen layout */}
        <Route element={<Layout variant="fullscreen" />}>
          <Route path="successful-order" element={<SuccessfulOrderPage />} />
        </Route>

        <Route path="*" element={<PageUndefined />} />

      </Routes>
    </BrowserRouter>
  );
}