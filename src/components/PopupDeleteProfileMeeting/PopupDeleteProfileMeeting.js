import React from "react";
import { MONTHS } from "../../utils/constants";
import Loader from "../Loader/Loader";
import "./PopupDeleteProfileMeeting.css";

const PopupDeleteProfileMeeting = ({ meeting, onClose, onDelete }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const meetingDate = new Date(meeting.date);

  const handleDeleteMeetingClick = () => {
    setIsLoading(true);
    onDelete(meeting, () => {
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <div className="popup-delete-profile-meeting">
      <p className="popup-delete-profile-meeting__text">
        {`Удалить встречу ${meeting.place} ${meetingDate.getDate()} ${
          MONTHS[meetingDate.getMonth()]
        } ${meetingDate.getFullYear()}?`}
      </p>
      <div className="popup-delete-profile-meeting__buttons">
        <button
          className="popup-delete-profile-meeting__button popup-delete-profile-meeting__button_active"
          type="button"
          onClick={handleDeleteMeetingClick}
        >
          Удалить
        </button>
        <button
          className="popup-delete-profile-meeting__button"
          type="button"
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
      {isLoading && <Loader isAbsolute={true} />}
    </div>
  );
};

export default PopupDeleteProfileMeeting;