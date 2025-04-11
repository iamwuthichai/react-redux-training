import IndexLayout from '../../../layouts/IndexLayout'
import ComponentMovieList from '../components/MovieListCard'

export const IndexPage = () => {
  return (
    <>
      <IndexLayout>
        <ComponentMovieList
          id={0}
          title={""}
          intheaters={false}
          releaseDate={""}
          poster={""}
        />
      </IndexLayout>
    </>
  );
}