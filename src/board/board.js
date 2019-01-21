import React, { Component } from 'react';
import { pawn } from '../boardService/boardService';
import './board.scss';

export default class Board extends Component {

  state = {
    values : [
      [10,9,8,7,6,8,9,10],
      [1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [-1,-1,-1,-1,-1,-1,-1,-1],
      [-10,-9,-8,-6,-7,-8,-9,-10]
    ],
    selectedPosition: {
      index: -1,
      subIndex: -1
    },
  }

  checkMovePossibility = (currentPosition, nextPosition) => {
    console.log("Checking the move possibility");

    const { index, subIndex, coin } = currentPosition;
    if ( coin === 0 ) {
      console.log("Not a valid coin");
      return false;
    } else {
      console.log("checking the service");
      // let coin = String(coin);
      console.log(coin);
      switch(coin) {
        case -1:
        case 1:
          console.log("inside the pawn case");
          return pawn(currentPosition, nextPosition);
          break;
        case -9:
        case 9:
          console.log("inside the horse case");
          return pawn(currentPosition, nextPosition);
          break;
        default:
          return false;
          console.log("It will not come here");
      }
    }
    return false;
  }

  selectPosition = (selectedIndex, selectedSubIndex, selectedValue) => {
    const { selectedPosition } = this.state;
    const { index, subIndex } = selectedPosition;

    if ( selectedIndex === index && selectedSubIndex === subIndex ) {
      console.log(selectedIndex, selectedSubIndex);
      console.log(index, subIndex);
      console.log("Removing the selection");
      this.setState({
        selectedPosition: {
          index: -1,
          subIndex: -1
        }
      });
    } else {
      console.log(selectedIndex, selectedSubIndex);
      const selectedMove = { index: selectedIndex, subIndex:selectedSubIndex, coin: selectedValue };

      if (index !== -1 && subIndex !== -1) {
        if (this.checkMovePossibility(selectedPosition, selectedMove)) {
          console.log("came inside this case");
          this.makeMove(selectedPosition, selectedMove);
        } else {
          console.log("came inside the else case");
          this.setState({
            selectedPosition: selectedMove
          });
        }
      } else {
        this.setState({
          selectedPosition: selectedMove
        });
      }
    }

  }

  makeMove = (selectedPosition, selectedMove) => {
    const { values } = this.state;

    values[selectedPosition.index][selectedPosition.subIndex] = 0;
    values[selectedMove.index][selectedMove.subIndex] = selectedPosition.coin;

    this.setState({
      values,
      selectedPosition: {
        index: -1,
        subIndex: -1
      }
    })

  }

  addClass = (value) => {
    switch(value) {
      case 1:
        return "chess_images black-pawn";
        break;
      case 10:
        return "chess_images black-castle";
        break;
      case 9:
        return "chess_images black-horse";
        break;
      case 8:
        return "chess_images black-bishop";
        break;
      case 7:
        return "chess_images black-queen";
        break;
      case 6:
        return "chess_images black-king";
        break;
      case -1:
        return "chess_images white-pawn";
        break;
      case -10:
        return "chess_images white-castle";
        break;
      case -9:
        return "chess_images white-horse";
        break;
      case -8:
        return "chess_images white-bishop";
        break;
      case -7:
        return "chess_images white-queen";
        break;
      case -6:
        return "chess_images white-king";
        break;
      default:
        return "";
    }
  }

  render() {
    const { values, selectedPosition } = this.state;
    const { index, subIndex } = selectedPosition;
    const selectedIndex = index;
    const selectedSubIndex = subIndex;

    const boardElements = values.map((vaule, index) => {

      if (index%2 === 0) {
        const inter = vaule.map((item, subIndex) => {
          let css_styles ="board_elements ";
          if(selectedIndex !== -1 && selectedIndex === index && selectedSubIndex !==-1 && selectedSubIndex === subIndex ) {
            css_styles += " active-selection ";
          }
          css_styles += this.addClass(item) + " ";
          css_styles += subIndex%2 !== 0 ? "even_box": "odd_box";
          return (<div key={subIndex} className={css_styles} onClick={()=>this.selectPosition(index, subIndex, item)} ></div>);
        });
        return inter;
      } else {
        const inter = vaule.map((item, subIndex) => {
          let css_styles ="board_elements ";
          if(selectedIndex !== -1 && selectedIndex === index && selectedSubIndex !==-1 && selectedSubIndex === subIndex ) {
            css_styles += " active-selection ";
          }
          css_styles += this.addClass(item) + " ";
          css_styles += subIndex%2 === 0 ? "even_box": "odd_box";
          return (<div key={subIndex} className={css_styles} onClick={()=>this.selectPosition(index, subIndex, item)} ></div> );
        });
        return inter;
      }
    });

    // console.log(boardElements);

    return (
      <div className="container">
        printing the board
        <div className="board-container">
          { boardElements }
        </div>
      </div>
    );
  }
}
