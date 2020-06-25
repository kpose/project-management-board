import React, { Component } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      error: '',
    }
  }

  async componentDidMount() {
    try {
      fetch('../assets/data.json', {
        headers : {
          'Accept': 'application/json'
        }
      })
          .then(response => response.json())
          .then(responseJSON => this.setState({
            loading: false,
            data:responseJSON
          }))
    } catch(error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }
  render() {
    const {data, loading, error} = this.state;

    const lanes = [
      { id: 1, title: 'To Do' },
      { id: 2, title: 'In Progress' },
      { id: 3, title: 'Review' },
      { id: 4, title: 'Done' },
    ];

    return (
      <BoardWrapper>
        {lanes.map(lane => (
          <Lane key={lane.id} title={lane.title}
                loading= {loading}
                error = {error}
                tickets = {data.filter(ticket => ticket.lane === lane.id)} />
        ))}
      </BoardWrapper>
    );
  }
}

export default Board;