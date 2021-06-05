import React from "react";
import PropTypes from "prop-types";
import "./ProfileMeeting.css";

import { MONTHS } from "../../utils/constants";

import ProfileMeetingForm from "../ProfileMeetingForm/ProfileMeetingForm";
import Loader from "../Loader/Loader";

const ProfileMeetting = ({ meeting, onUpdate, onDelete, onShare }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEditMeetingClick = () => {
    setIsEdit(true);
  };

  const handleShareMeetingClick = () => {
    setIsLoading(true);
    onShare(meeting, () => setIsLoading(false));
  };

  const meetingDate = new Date(meeting.date);

  let ratingText;
  if (meeting.rating === "good") {
    ratingText = "Было классно!";
  } else if (meeting.rating === "normal") {
    ratingText = "Нормально";
  } else if (meeting.rating === "bad") {
    ratingText = "Что-пошло не так";
  }

  return (
    <li className="profile-meeting">
      <article className="profile-meeting__article">
        {isEdit ? (
          <ProfileMeetingForm
            meeting={meeting}
            mix="profile-meeting__form"
            onClose={() => {
              setIsEdit(false);
            }}
            onSubmit={onUpdate}
            onDelete={onDelete}
          />
        ) : (
          <figure className="profile-meeting__figure">
            <img
              className="profile-meeting__image"
              src={meeting.imageUrl}
              alt="фото встречи"
            />
            <figcaption className="profile-meeting__info">
              <div className="profile-meeting__description">
                <h3 className="profile-meeting__title">{meeting.place}</h3>
                <p className="profile-meeting__date">
                  <span className="profile-meeting__date-month-year">
                    {`${
                      MONTHS[meetingDate.getMonth()]
                    }, ${meetingDate.getFullYear()} `}
                  </span>
                  <span className="profile-meeting__date-number">
                    {`00${meetingDate.getDate()}`.slice(-2)}
                  </span>
                </p>
                <p className="profile-meeting__review">{meeting.description}</p>
              </div>
              <div className="profile-meeting__actions">
                <div
                  className={`profile-meeting__rating profile-meeting__rating_type_${meeting.rating}`}
                >
                  <div
                    className={`profile-meeting__rating-emoji profile-meeting__rating-emoji_type_${meeting.rating}`}
                  ></div>
                  <p className="profile-meeting__rating-text">{ratingText}</p>
                </div>
                <div className="profile-meeting__actions-buttons">
                  {meeting.isShared ? (
                    <p className="profile-meeting__actions-button profile-meeting__actions-button_active profile-meeting__actions-button_type_share">
                      Открыто Александре К.
                    </p>
                  ) : (
                    <button
                      className="profile-meeting__actions-button profile-meeting__actions-button_type_share"
                      type="button"
                      onClick={handleShareMeetingClick}
                    >
                      Поделиться с куратором
                    </button>
                  )}
                  <button
                    className="profile-meeting__actions-button profile-meeting__actions-button_type_edit"
                    type="button"
                    onClick={handleEditMeetingClick}
                  >
                    Редактировать
                  </button>
                  <button
                    className="profile-meeting__actions-button profile-meeting__actions-button_type_delete"
                    type="button"
                    onClick={() => onDelete(meeting)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </figcaption>
          </figure>
        )}
        {isLoading && <Loader isAbsolute={true} />}
      </article>
    </li>
  );
};

ProfileMeetting.propTypes = {
  meeting: PropTypes.shape({
    date: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    rating: PropTypes.oneOf(["good", "normal", "bad", ""]),
    isShared: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default ProfileMeetting;