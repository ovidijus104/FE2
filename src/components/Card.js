import React from 'react';
import { getImageUrl } from '../../config';

export default class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  toggleSummary = () => {
    const { opened } = this.state;

    this.setState({
      opened: !opened,
    });
  };

  render() {
    const {
      movie: {
        id,
        backdrop_path,
        original_title,
        overview,
        release_date,
        vote_average,
        vote_count,
      },
      likeIds,
      handleLikeClick
    } = this.props;
    const { opened } = this.state;

    return (
      <div className="card" key={id}>
        <div
          className="card__image"
          style={{ backgroundImage: `url(${getImageUrl(backdrop_path)})` }}
        />

        <div className="card__title">
          {original_title}
        </div>

        <div className="card__like">
          <i className={likeIds.indexOf(id) > -1 ? "fa fa-heart" : "fa fa-heart-o"} onClick={() => handleLikeClick(id)} />
        </div>

        <div className="card__subtitle">
          <span>{release_date}</span>
          <span>{vote_average} ({vote_count} votes)</span>
        </div>

        <div className="card-info">
          <div className="card-info__header" onClick={this.toggleSummary}>
            Summary
          </div>

          {opened
            ? <div className="card-info__description">{overview}</div>
            : null
          }

        </div>
      </div>
    );
  }
}
