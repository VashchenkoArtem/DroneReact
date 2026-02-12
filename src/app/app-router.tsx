import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Layout } from "./Layout"
import { HomePage, AboutUsPage, PageUndefined, CatalogPage } from "../pages"
import { OneProductPage } from "../pages/one-product-page/one-product-page"
import { ProfilePage } from "../pages/profile"


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/product/:id" element = {<OneProductPage/>}/>
          <Route path="/catalog" element = {<CatalogPage/>}/>
          <Route path="/about" element = {<AboutUsPage/>} />
          <Route path="/profileInformation" element = {<ProfilePage/>}/>
          <Route path="*" element = {<PageUndefined/>}/>
        </Route>
      </Routes>
    </BrowserRouter>  
  )
}