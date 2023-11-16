import { useEffect } from 'react';
import { useInterests } from '../context/InterestsContext';
import InterestCard from '../components/InterestCard';

function InterestsPage() {
  const { getInterests, interests } = useInterests();

  useEffect(() => {
    getInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (interests.length == 0)
    return <h1>There are no registered Interests in the list</h1>;

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {interests.map((interest) => (
        <InterestCard interest={interest} key={interest._id} />
      ))}
    </div>
  );
}

export default InterestsPage;
