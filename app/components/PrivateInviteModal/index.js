import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import classNames from 'classnames';
import { Modal, CloseLink } from './styled';
import TextInput from '../Inputs/Text';
import { apiLocation } from '../../config';
import PrivateEventJoinForm from '../PrivateEventJoinForm';

const PrivateInviteModal = props => {
  const [title, setTitle] = useState('');
  const [length, setLength] = useState(6);
  const [wind, setWind] = useState('none');
  const [attempts, setAttempts] = useState(1);
  const [loading, setLoading] = useState(false);
  const [eventUuid, setEventUuid] = useState('');
  const [hasFormErrors, setHasFormErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // eslint-disable-next-line consistent-return
  const submitForCreate = async e => {
    e.preventDefault();
    setLoading(true);

    if (!title) {
      setSubmitted(true);
      setHasFormErrors(true);
      setLoading(false);
      return false;
    }

    const obj = {
      title,
      length,
      windlevel: wind,
      attemptsmax: attempts,
      userid: props.userId,
    };

    await fetch(`${apiLocation}/private/pvpcompetitions/create`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ItasGolfToken')}`,
      },
      body: JSON.stringify(obj),
    })
      .then(res => res.text())
      .then(async body => {
        const data = JSON.parse(body);
        setHasFormErrors(false);
        setSubmitted(true);
        setEventUuid(data.privateCompetitionInfo.uuid);
      })
      .catch(() => setHasFormErrors(true));
  };

  const windOptions = [
    { value: 'none', description: 'None' },
    { value: 'light', description: 'Light' },
    { value: 'normal', description: 'Normal' },
    { value: 'heavy', description: 'Heavy' },
    { value: 'insane', description: 'Insane' },
  ];

  const lengthOption = [
    { value: 6, description: '6 Hours' },
    { value: 12, description: '12 Hours' },
    { value: 24, description: '24 Hours' },
    { value: 48, description: '48 Hours' },
    { value: 72, description: '72 Hours' },
  ];

  const attemptOptions = [
    { value: 1, description: 'One' },
    { value: 2, description: 'Two' },
    { value: 5, description: 'Five' },
    { value: 10, description: 'Ten' },
  ];

  const renderBody = () => {
    if (eventUuid !== '') {
      const eventLink = `/events/${eventUuid}`;
      return (
        <div className="p-10">
          <p className="text-base mb-5">
            Share event URL with friends to join.
          </p>
          <PrivateEventJoinForm tokenForInvite={eventUuid} />
          <p>
            <Link
              to={eventLink}
              className="btn text-center rounded overflow-hidden shadow-lg flex flex-row sm:flex-col h-full"
            >
              Take me to Event
            </Link>
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={submitForCreate} className="m-10">
        <div className="flex flex-col mb-5">
          <TextInput
            className={classNames('bg-white', {
              'border border-red': hasFormErrors && submitted,
            })}
            id="title-input"
            name="title"
            label="Name Your Event"
            placeholder=""
            onChange={event => setTitle(event.target.value)}
          />
          <div className="mb-5">
            <label
              className="text-sm font-bold uppercase text-blueberry"
              htmlFor="wind"
            >
              Wind Strength:&nbsp;
            </label>
            <select
              name="wind"
              id="wind"
              onChange={event => {
                setWind(event.target.value);
              }}
            >
              {windOptions.map(windOption => (
                <option key={windOption.value} value={windOption.value}>
                  {windOption.description}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              className="text-sm font-bold uppercase text-blueberry"
              htmlFor="lengths"
            >
              Choose a length:&nbsp;
            </label>
            <select
              name="lengths"
              id="lengths"
              onChange={event => {
                setLength(event.target.value);
              }}
            >
              {lengthOption.map(lengthOp => (
                <option key={lengthOp.value} value={lengthOp.value}>
                  {lengthOp.description}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              className="text-sm font-bold uppercase text-blueberry"
              htmlFor="attempts"
            >
              Max Attempts:
            </label>
            <select
              name="attempts"
              id="attempts"
              onChange={event => {
                setAttempts(event.target.value);
              }}
            >
              {attemptOptions.map(attemptOp => (
                <option key={attemptOp.value} value={attemptOp.value}>
                  {attemptOp.description}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div align="center" className="mb-5">
          <Button
            buttonLabel="Make It Happen"
            color="#3b38c6"
            isLoading={loading}
            className="btn mr-3"
          />
        </div>
      </form>
    );
  };

  return (
    <Modal
      open={props.onOpen}
      className="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75 bg-blueberry"
    >
      <div className="w-1/2 lg:w-1/3 mx-3 sm:mx-8">
        <header className="py-8 relative bg-white flex items-center justify-center">
          <h1 className="text-xl w-1/2 text-center uppercase text-blueberry tracking-wide">
            Create Your Own Challenge
          </h1>
          <CloseLink
            className="absolute right-0 mr-3 sm:mr-8"
            onClick={() => {
              props.callbackClose();
            }}
          />
        </header>
        {renderBody()}
      </div>
    </Modal>
  );
};

PrivateInviteModal.propTypes = {
  callbackClose: PropTypes.func,
  onOpen: PropTypes.bool,
  userId: PropTypes.string,
};

export default PrivateInviteModal;
