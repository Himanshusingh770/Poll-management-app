// PollList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolls } from '../slices/pollsSlice';
import PollItem from '../Components/PollItems';

const PollList = () => {
  const dispatch = useDispatch();
  const { polls, status, hasMore } = useSelector((state) => state.polls);
  const roleId = useSelector((state) => state.auth.roleId); // Assuming roleId is stored in auth slice
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPolls({ page, limit: 10 }));
  }, [dispatch, page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (status === 'loading') return <p className="text-center">Loading polls...</p>;
  if (status === 'failed') return <p className="text-center text-red-500">Failed to load polls. Please try again later.</p>;

  return (
    <div className="polls-list p-4 space-y-4">
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} isAdmin={roleId === ADMIN_ID || roleId === HR_ID} />
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PollList;
