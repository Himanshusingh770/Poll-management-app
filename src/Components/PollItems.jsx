
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitVote } from '../slices/pollsSlice';
// Assuming these constants are defined somewhere in your project
import { ADMIN_ID, HR_ID } from '../utils/constantData';

const PollItem = ({ poll }) => {
  const dispatch = useDispatch();
  const userVotes = useSelector((state) => state.polls.userVotes);
  const roleId = useSelector((state) => state.auth.roleId); 
  const hasVoted = userVotes[poll.id] !== undefined;

  const handleVote = (voteOption) => {
    if (!hasVoted) {
      dispatch(submitVote({ pollId: poll.id, voteOption }));
    }
  };

  // Check if the user is admin or HR
  const isAdmin = roleId === ADMIN_ID || roleId === HR_ID;

  return (
    <div className="poll-item p-4 border rounded-lg shadow-lg">
      <h3 className="font-bold text-lg">{poll.title}</h3>
      <div className="options mt-2 space-x-2">
        {poll.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleVote(option)}
            disabled={hasVoted}
            className={`${
              hasVoted ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-1 px-3 rounded`}
          >
            {option} {hasVoted && option === userVotes[poll.id] ? '(Voted)' : ''}
          </button>
        ))}
      </div>
      {isAdmin && (
        <div className="admin-controls mt-2 flex space-x-2">
          <button
            onClick={() => console.log('Edit poll')} 
            className="text-green-500 hover:text-green-700"
          >
            Edit
          </button>
          <button
            onClick={() => console.log('Show results')} 
            className="text-blue-500 hover:text-blue-700"
          >
            Show Results
          </button>
        </div>
      )}
    </div>
  );
};

export default PollItem;
