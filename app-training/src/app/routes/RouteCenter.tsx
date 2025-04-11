import { BrowserRouter as Router, Routes, Route } from "react-router";
import { IndexPage as MovieIndexPage } from "../../modules/Movie/pages/IndexPage";
import { IndexPage as ActorIndexPage } from "../../modules/Actor/pages/IndexPage";
import MovieCreatePage from "../../modules/Movie/pages/MovieCreatePage";
import MovieUpdatePage from "../../modules/Movie/pages/MovieUpdatePage";
import MovieDetailPage from "../../modules/Movie/pages/MovieDetailPage";

const RouteCenter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieIndexPage />} />
        <Route path="/movies" element={<MovieIndexPage />} />
        <Route path="/movies/create" element={<MovieCreatePage />} />
        <Route path="/movies/update/:id" element={<MovieUpdatePage />} />
        <Route path="/movies/detail/:id" element={<MovieDetailPage />} />
        <Route path="/actors" element={<ActorIndexPage />} />
      </Routes>
    </Router>
  )
}

export default RouteCenter