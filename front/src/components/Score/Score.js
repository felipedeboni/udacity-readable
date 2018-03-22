import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown
} from '@fortawesome/fontawesome-free-solid';
import './Score.css';

const Score = ({ id, score, onVoteUp, onVoteDown }) => {
  return (
    <div className="score">
      <span className="score__number">{score}</span>
      <FontAwesomeIcon
        className="score__vote score__vote--up"
        icon={faChevronUp}
        onClick={() => onVoteUp(id)}
      />
      <FontAwesomeIcon
        className="score__vote score__vote--down"
        icon={faChevronDown}
        onClick={() => onVoteDown(id)}
      />
    </div>
  );
};

Score.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired
};

export default Score;
