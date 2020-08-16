import React, { Component } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../assets/fonts';

import ReviewsOverview from '../ReviewsOverview';
import ReviewsSearch from '../ReviewsSearch';
import ReviewsSort from '../ReviewsSort';
import ReviewsDisplay from '../ReviewsDisplay';

import { getAllReviews } from '../../lib/DatabaseRequests';
import { Filter, Sort, Calc } from '../../lib/FilterSortCalc';

const ReviewsWrapper = styled.div`
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      totalReviews: 0,
      reviewStarPercentages: {},
      reviewAverageScore: 0,
      reviewDisplayCount: 3,
      filteredReviews: [],
      filterCondition: 0,
      sortCondition: 'Most helpful',
    };
    this.filterReviewsByStarRating = this.filterReviewsByStarRating.bind(this);
    this.filterReviewsByText = this.filterReviewsByText.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
    this.increaseReviewDisplayCount = this.increaseReviewDisplayCount.bind(this);
    this.resetReviewDisplayCount = this.resetReviewDisplayCount.bind(this);
  }

  componentDidMount() {
    getAllReviews((reviews) => {
      const totalReviews = reviews.length;
      const reviewStarPercentages = Calc.getStartPercentagesFills(reviews);
      const reviewAverageScore = Calc.getTotalReviewAverageScore(reviews);
      this.sortReviews(reviews);
      this.setState({
        reviews,
        totalReviews,
        reviewAverageScore,
        reviewStarPercentages,
      });
    });
  }

  filterReviewsByStarRating(value) {
    const { reviews } = this.state;
    if (value === 0) {
      this.sortReviews(reviews);
      this.setState({ filterCondition: value });
    } else {
      const filtered = Filter.byRating(reviews, value);
      this.sortReviews(filtered);
      if (filtered.length) { this.setState({ filterCondition: value }); }
    }
  }

  filterReviewsByText(value) {
    const { reviews } = this.state;
    const filtered = Filter.byText(reviews, value);
    this.sortReviews(filtered);
    this.setState({ filterCondition: value });
  }

  sortReviews(reviews, value) {
    const { sortCondition } = this.state;
    const condition = value || sortCondition;
    if (condition === 'Includes customer photos') {
      const filteredReviews = Sort.includesCustomerPhotos(reviews);
      this.resetReviewDisplayCount();
      this.setState({ filteredReviews, sortCondition: condition });
      return;
    }
    if (value === 'Most recent') {
      const filteredReviews = Sort.mostRecent(reviews);
      this.resetReviewDisplayCount();
      this.setState({ filteredReviews, sortCondition: condition });
      return;
    }
    const filteredReviews = Sort.mostHelpful(reviews);
    this.resetReviewDisplayCount();
    this.setState({ filteredReviews, sortCondition: condition });
  }

  increaseReviewDisplayCount() {
    this.setState((prevState) => ({ reviewDisplayCount: prevState.reviewDisplayCount + 10 }));
  }

  resetReviewDisplayCount() {
    this.setState({ reviewDisplayCount: 3 });
  }

  render() {
    const {
      reviews,
      totalReviews,
      reviewStarPercentages,
      reviewAverageScore,
      reviewDisplayCount,
      filteredReviews,
      filterCondition,
    } = this.state;
    return (
      <ReviewsWrapper>
        <ReviewsOverview
          reviews={reviews}
          totalReviews={totalReviews}
          reviewStarPercentages={reviewStarPercentages}
          reviewAverageScore={reviewAverageScore}
          filterCondition={filterCondition}
          filterReviewsByStarRating={this.filterReviewsByStarRating}
        />
        <ReviewsSearch
          filterReviewsByText={this.filterReviewsByText}
        />
        <ReviewsSort
          reviewDisplayCount={reviewDisplayCount}
          filteredReviews={filteredReviews}
          filterCondition={filterCondition}
          filterReviewsByStarRating={this.filterReviewsByStarRating}
          sortReviews={this.sortReviews}
        />
        <ReviewsDisplay
          reviewDisplayCount={reviewDisplayCount}
          filteredReviews={filteredReviews}
          filterCondition={filterCondition}
          increaseReviewDisplayCount={this.increaseReviewDisplayCount}
          resetReviewDisplayCount={this.resetReviewDisplayCount}
        />
        <GlobalStyle />
      </ReviewsWrapper>
    );
  }
}

export default App;