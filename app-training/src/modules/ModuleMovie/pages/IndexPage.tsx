import IndexLayout from '../../../layouts/IndexLayout'
import ComponentMovieList from '../components/ComponentMovieList'

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