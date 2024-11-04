import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { ADMIN_ID } from "../utils/constantData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Admin actions component
const AdminActions = ({ poll, showPollChartModal, showDeleteModal }) => (
  <div className="flex gap-4 justify-end mb-4">
    <FaTrashAlt onClick={() => showDeleteModal(poll)} className="text-red-500 cursor-pointer" />
    <Link to={`/editpoll/${poll.id}`} state={poll}>
      <FaEdit className="text-blue-500 cursor-pointer" />
    </Link>
    <IoBarChart onClick={() => showPollChartModal(poll)} className="text-pink-400 cursor-pointer" />
  </div>
);

// Poll options component
const PollOptions = ({ poll, selectedOption, setSelectedOption, voted }) => (
  <>
    {poll.optionList?.map((option, index) => (
      <div key={index} className="mb-2">
        <input
          type="radio"
          id={`option${poll.id}_${index}`}
          name={`pollOption_${poll.id}`}
          value={option.id}
          checked={option.id === selectedOption}
          onChange={() => setSelectedOption(option.id)}
          disabled={voted}
        />
        <label htmlFor={`option${poll.id}_${index}`} className="ml-2 cursor-pointer">
          {option.optionTitle}
        </label>
      </div>
    ))}
  </>
);
// Submit button component
const SubmitButton = ({ voted, submitVote }) => (
  <button
    type="submit"
    className={`w-full ${voted ? "bg-gray-400" : "bg-blue-500"} text-white mt-5 py-2 rounded`}
    disabled={voted}
  >
    {voted ? "Voted" : "Vote"}
  </button>
);
// Main poll item component
const PollItem = ({ poll, showPollChartModal, increaseVoteCount, showDeleteModal }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const votedPollStatus = JSON.parse(localStorage.getItem(`VotedPollsOptions_${user.id}`)) || {};
    const userVotedOption = votedPollStatus[poll.id];
    if (userVotedOption) {
      setSelectedOption(userVotedOption);
      setVoted(true);
    } else {
      setSelectedOption(null);
      setVoted(false);
    }
  }, [poll.id, user.id]);

  const submitVote = (e) => {
    e.preventDefault();
    if (!voted && selectedOption) {
      const votedPollStatus = JSON.parse(localStorage.getItem(`VotedPollsOptions_${user.id}`)) || {};
      votedPollStatus[poll.id] = selectedOption;
      localStorage.setItem(`VotedPollsOptions_${user.id}`, JSON.stringify(votedPollStatus));
      increaseVoteCount(poll.id, selectedOption);
      setVoted(true);
    }
  };

  return (
    <div className="w-[80%] sm:w-[48%] lg:w-[30%] 2xl:w-[24%] mt-8 min-h-[300px] bg-gray-100 rounded shadow-lg p-4 flex flex-col justify-between">
      {user?.roleId === ADMIN_ID && (
        <AdminActions poll={poll} showPollChartModal={showPollChartModal} showDeleteModal={showDeleteModal} />
      )}
      <h2 className="text-xl font-semibold text-center mb-4">{poll.title}</h2>
      <form onSubmit={submitVote}>
        <PollOptions
          poll={poll}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          voted={voted}
        />
        <SubmitButton voted={voted} submitVote={submitVote} />
      </form>
    </div>
  );
};

export default PollItem;
