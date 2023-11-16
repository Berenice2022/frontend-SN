import { useEffect } from 'react';
import { useInfoProfiles } from '../context/InfoProfilesContext';
import InfoProfileCard from '../components/InfoProfileCard';

function InfoProfilesPage() {
  const { getInfoProfiles, infoprofiles } = useInfoProfiles();

  useEffect(() => {
    getInfoProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (infoprofiles.length == 0)
    return <h1>There are no registered InfoProfile in the list</h1>;

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {infoprofiles.map((infoprofile) => (
        <InfoProfileCard infoprofile={infoprofile} key={infoprofile._id} />
      ))}
    </div>
  );
}

export default InfoProfilesPage;
