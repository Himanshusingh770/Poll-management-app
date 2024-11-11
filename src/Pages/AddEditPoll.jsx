import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPoll,
  getSinglePoll,
  updatePoll,
  updatePollTitle,
} from "../slices/pollsSlice";
import { validateAddEditForm } from "../utils/validationUtils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmationDeleteModal from "../Components/ConformDeleteModal";
import ErrorComponent from "../Components/ErrorComponent";
import SuccessModal from "../Components/SuccessModal";
import {
  addOption,
  deleteOption,
  updateOption,
} from "../slices/optionSlice";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const AddEditPoll = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [newPollData, setNewPollData] = useState({
    title: "",
    optionTitle: "",
  });
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({ title: "", optionTitle: "" });
  const [showModal, setShowModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editOption, setEditOption] = useState(null);
  const { loading  } = useSelector((state) => state.poll || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSinglePollDetails = async () => {
    if (state) {
      setNewPollData({ ...newPollData, title: state.title });
      setOptions(state.optionList);
    } else {
      const result = await dispatch(getSinglePoll(id));
      if (result?.payload?.status === 200) {
        setNewPollData({ ...newPollData, title: result?.payload?.data?.title });
        setOptions(result?.payload?.data?.optionList);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSinglePollDetails();
    }
  }, []);

  const handleOptionChange = (e) => {
    setNewPollData({ ...newPollData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };



  const handleDeleteOption = () => {
    console.log(id);
    if (id) {
      const deleteOptionId = options[selectedIndex].id;
      dispatch(deleteOption(deleteOptionId));
    }
    const newOptions = [...options];
    newOptions.splice(selectedIndex, 1);
    setOptions(newOptions);
    setShowDeletedModal(false);
    setSelectedIndex(null);
  };

  const handleUpdateOption = (index) => {
    const option = options[index];
    setNewPollData({ ...newPollData, optionTitle: option?.optionTitle });
    setEditOption({ index, id: option?.id });
  };

  const handleShowModal = (data) => {
    if (data?.payload?.status === 200) {
      setShowModal(true);
    }
  };

  const onFormSubmit = async () => {
    const newPoll = {
      title: newPollData.title,
      options,
    };
    const { newErrors, isVallid } = validateAddEditForm({
      options,
      title: newPollData.title,
    });
    if (isVallid) {
      let result = {};
      if (id) {
        if (state.title !== newPollData.title) {
          result = await dispatch(updatePollTitle({ id, newPoll }));
        }
        setShowModal(true);
      } else {
        result = await dispatch(addPoll(newPoll));
        handleShowModal(result);
      }
      setShowModal(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto  p-8 bg-gray-100 rounded shadow-lg mt-24">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Update" : "Create"} Poll
      </h2>
      <div>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="title"
            className="w-full px-4 py-2 border rounded"
            value={newPollData.title}
            onChange={handleOptionChange}
          />
          <ErrorComponent errorMessage={errors.title} />
        </div>
        <div className="form-add-option">
          <p className="add-option">Option</p>
          <div className="flex my-2">
            <input
              id="option"
              name="optionTitle"
              className="border rounded-l-md p-2 w-full"
              value={newPollData.optionTitle}
              onChange={handleOptionChange}
              placeholder="Enter Option"
            />
            <button
              className="border-l border-gray-300 bg-blue-500 text-white p-2 rounded-r-md"
              onClick={() => handleAddOption()}
            >
              <IoIosAddCircle />
            </button>
          </div>
          <ErrorComponent errorMessage={errors.optionTitle} />
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {options.map((item, index) => (
            <div
              className="flex bg-white items-center max-w-max border rounded-lg p-2"
              key={index}
            >
              {item.optionTitle}
              <button
                className="ml-1"
                onClick={() => handleUpdateOption(index)}
              >
                <MdModeEditOutline />
              </button>
              <button
                className=""
                onClick={() => {
                  setSelectedIndex(index);
                  setShowDeletedModal(true);
                }}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
        <div className="w-full text-center mt-6">
          <button
            type="button"
            className="w-[50%] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => onFormSubmit()}
            disabled={loading}
          >
            {loading ? (
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
      {showModal && (
       <SuccessModal
       show={showModal}
       modalTitle="Successfully"
       btnCancelText="Cancel"
       modalSubTitle={`Poll ${id ? "updated" : "created"} successfully. Click OK to redirect to the poll page.`}
       okButton="Ok"
       onOkClick={() => {
         navigate("/");
         setShowModal(false); 
       }}
     />
      )}
      {showDeletedModal && (
        <ConfirmationDeleteModal
          OkText={"Delete"}
          btnCancelText={"Cancel"}
          onBtnCancelClick={() => setShowDeletedModal(false)}
          modalTitle={"Delete"}
          modalSubTitle={"Are You Sure? you want delete this item "}
          onBtnOkClick={handleDeleteOption}
          btnColor={"bg-red-500"}
        />
      )}
    </div>
  );
};

export default AddEditPoll;