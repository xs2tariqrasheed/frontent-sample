/**
 *
 * PrivateEventJoinModal
 *
 */

import React, { memo, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { apiLocation } from '../../config';
import Button from '../Button';

function PrivateEventJoinForm({ tokenForInvite, darkMode }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [hasError, setHasError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const inputRef = useRef(null);

  const submitForJoin = e => {
    e.preventDefault();
    setLoading(true);
    fetch(`${apiLocation}/public/privatechallenge/${token}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('ItasGolfToken')}`,
      },
    })
      .then(res => {
        setSubmitSuccess(res.status !== 404);
        setHasError(res.status === 404);
        setLoading(false);
      })
      .catch(() => {
        setSubmitSuccess(false);
        setHasError(true);
        setLoading(false);
      });
  };

  const submitForCopy = e => {
    e.preventDefault();
    inputRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return submitSuccess ? (
    <Redirect to={`/events/${token}`} />
  ) : (
    <form onSubmit={tokenForInvite ? submitForCopy : submitForJoin}>
      <div className="mb-5">
        <label
          className="text-sm font-bold uppercase text-blueberry"
          htmlFor="challenge-code"
        >
          Event URL
        </label>
        <div className="flex">
          <input
            className={classNames({
              'bg-gray-200': darkMode,
              'bg-white': !darkMode,
            })}
            type="text"
            id="challenge-code"
            name="challenge-code"
            ref={inputRef}
            value={`${window.location.origin}/events/${tokenForInvite}`}
            onChange={e => setToken(e.target.value)}
          />
          <Button
            buttonLabel={(() => {
              if (tokenForInvite) {
                return copySuccess ? 'Copied!' : 'Copy';
              }
              return 'Start';
            })()}
            type="submit"
            color="#3b38c6"
            isLoading={loading}
            className={classNames(
              'uppercase text-sm text-cornflower font-heavy px-5',
              {
                'bg-gray-200': darkMode,
                'bg-white': !darkMode,
              },
            )}
          />
        </div>
      </div>
      {hasError && (
        <p className="text-red">Please provide a valid invite token.</p>
      )}
    </form>
  );
}

PrivateEventJoinForm.propTypes = {
  tokenForInvite: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default memo(PrivateEventJoinForm);
