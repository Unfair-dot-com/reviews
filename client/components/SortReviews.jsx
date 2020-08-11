import React from 'react';
import PropTypes from 'prop-types';

class SortReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Most relevant' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.handleSumbit(event.target.value);
  }

  handleSumbit(value) {
    const { sortReviewsBy } = this.props;
    sortReviewsBy(value);
  }

  render() {
    const { filteredReviews, reviewDisplayCount } = this.props;
    const { value } = this.state;
    return (
      <section>
        <h1>
          SORT REVIEWS
        </h1>
        <p>
          Showing
          {' '}
          {filteredReviews.length ? '1-' : '0-'}
          {reviewDisplayCount > filteredReviews.length
            ? filteredReviews.length : reviewDisplayCount}
          {' '}
          of
          {' '}
          {filteredReviews.length}
          {' '}
          reviews.
        </p>
        <div>
          <span>Sort By </span>
          <select value={value.value} onChange={this.handleChange}>
            <option value="Most relevant">Most relevant</option>
            <option value="Includes customer photos">Includes customer photos</option>
            <option value="Most recent">Most recent</option>
            <option value="Most helpful">Most helpful</option>
          </select>
        </div>
      </section>
    );
  }
}

SortReviews.propTypes = {
  reviewDisplayCount: PropTypes.number.isRequired,
  filteredReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortReviewsBy: PropTypes.func.isRequired,
};

export default SortReviews;