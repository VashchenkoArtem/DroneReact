import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Layout } from "./Layout"
import { HomePage, AboutUsPage, PageUndefined } from "../pages"


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Layout/>}>
              <Route path="/" element = {<HomePage/>}/>
              <Route path="/about" element = {<AboutUsPage/>} />
              <Route path="*" element = {<PageUndefined/>}/>
          </Route>
      </Routes>
    </BrowserRouter>  
  )
}