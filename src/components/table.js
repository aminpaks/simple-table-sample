import React from 'react';
import styled, { css } from 'styled-components';

const CssCell = css`
  display: block;
  transition: 120ms ease-in-out;
  padding: 4px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid;
  border-top: none;
  border-left: none;
  background-color: transparent;

  &:last-child {
    border-bottom: none;
  }
`;
const StyledCell = styled.div`
  ${CssCell};
`;
const StyledHead = styled.header`
  ${CssCell};
  font-weight: bold;
`;
const StyledColumn = styled.div`
  flex: 1 0 auto;

  &:last-of-type {
    ${StyledCell}, ${StyledHead} {
      border-right-width: 0;
    }
  }
`;
const StyledColumns = styled.div`
  display: flex;
`;
const StyledTable = styled.div`
  width: 100%;
  display: inline-block;
  border: 1px solid;
`;

export class Table extends React.Component {
  static defaultProps = {
    rows: [],
    head: null,
    foot: null,
    getRow: () => null
  };
  state = {
    hovered: []
  };
  handleHoverOver = ({ target }) => {
    const id = parseInt(target.getAttribute('data-id'), 10);
    if (!isNaN(id)) {
      const { hovered } = this.state;
      if (!hovered.includes(id)) {
        this.setState({ hovered: [...hovered, id] });
      }
    }
  };
  handleHoverOut = ({ target }) => {
    const id = parseInt(target.getAttribute('data-id'), 10);
    if (!isNaN(id)) {
      const { hovered } = this.state;
      if (hovered.includes(id)) {
        this.setState({ hovered: hovered.filter(i => i !== id) });
      }
    }
  };
  getColumn(child) {
    if (typeof child === 'object' && child.type === Column) {
      const { props } = child;
      const { value, title } = props;
      const { data } = this.props;
      const { hovered } = this.state;
      return (
        <StyledColumn key={value}>
          <StyledHead>{title || value}</StyledHead>
          {data.map(item => (
            <StyledCell
              key={item.id}
              style={{
                backgroundColor: hovered.includes(item.id) && '#ddd'
              }}
              data-id={item.id}
              //               onMouseOver={this.handleHoverState(item.id, true)}
              //               onMouseOut={this.handleHoverState(item.id, false)}
            >
              {item[value]}
            </StyledCell>
          ))}
        </StyledColumn>
      );
    }
    return child;
  }
  getColumns() {
    const { children } = this.props;
    if (Array.isArray(children)) {
      return (
        <StyledColumns>
          {children.map(child => this.getColumn(child))}
        </StyledColumns>
      );
    }
    return <StyledColumns>{this.getColumns(children)}</StyledColumns>;
  }
  render() {
    return (
      <StyledTable
        onMouseOver={this.handleHoverOver}
        onMouseOut={this.handleHoverOut}
      >
        {this.getColumns()}
      </StyledTable>
    );
  }
}

export const Column = () => null;
