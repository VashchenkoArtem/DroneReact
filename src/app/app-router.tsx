import { Routes, Route } from "react-router-dom"
import { Layout } from "./Layout"
import { HomePage, AboutUsPage, PageUndefined } from "../pages"


export function AppRouter() {
  return (
    <Routes>
        <Route path = "/" element = {<Layout></Layout>}>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/about" element = {<AboutUsPage/>} />
            <Route path="*" element = {<PageUndefined/>}/>
        </Route>
    </Routes>
  )
}