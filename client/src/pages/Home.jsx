import { useQuery } from '@apollo/client';

//replace with 
import ThoughtList from '../components/';
import ThoughtForm from '../components/';

// insert search query->  import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery();

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
         
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

