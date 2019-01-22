import React, { Component } from 'react';
import { pawn, horse, bishop, castle, queen, king } from '../boardService/boardService';
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
    turn: "black",
    rotate: false
  }

  rotateBoard = () => {
    this.setState(prevState => ({
      rotate: !prevState.rotate
    }));
  }

  checkMovePossibility = (currentPosition, nextPosition) => {
    const { values } = this.state;

    const { index, subIndex, coin } = currentPosition;
    if ( coin === 0 ) {
      console.log("Not a valid coin");
      return false;
    } else {
      switch(coin) {
        case -1:
        case 1:
          console.log("inside the pawn case");
          return pawn(currentPosition, nextPosition, values);
          break;
        case -9:
        case 9:
          console.log("inside the horse case");
          return horse(currentPosition, nextPosition, values);
          break;
        case -8:
        case 8:
          console.log("inside the bishop case");
          return bishop(currentPosition, nextPosition, values);
          break;
        case -10:
        case 10:
          console.log("inside the castle case");
          return castle(currentPosition, nextPosition, values);
          break;
        case -7:
        case 7:
          console.log("inside the queen case");
          return queen(currentPosition, nextPosition, values);
          break;
        case -6:
        case 6:
          console.log("inside the king case");
          return king(currentPosition, nextPosition, values);
          break;
        default:
          return false;
          console.log("It will not come here");
      }
    }
    return false;
  }

  selectPosition = (selectedIndex, selectedSubIndex, selectedValue) => {
    const { selectedPosition, turn } = this.state;
    const { index, subIndex } = selectedPosition;


    if ( selectedIndex === index && selectedSubIndex === subIndex ) {
      this.setState({
        selectedPosition: {
          index: -1,
          subIndex: -1
        }
      });
    } else {
      const selectedMove = { index: selectedIndex, subIndex:selectedSubIndex, coin: selectedValue };

      if (index !== -1 && subIndex !== -1) {
        if ((turn === 'black' && selectedPosition.coin === 0 && selectedValue < 0) || (turn === 'white' && selectedPosition.coin === 0 && selectedValue > 0)) {
          // console.log("invalid selection");
          this.setState({
            selectedPosition: {
              index: -1,
              subIndex: -1
            }
          });
          return;
        }
        if (this.checkMovePossibility(selectedPosition, selectedMove)) {
          this.makeMove(selectedPosition, selectedMove);
        } else {
          this.setState({
            selectedPosition: selectedMove
          });
        }
      } else {
        if ((turn === 'black' && selectedValue < 0) || (turn === 'white' && selectedValue > 0)) {
          // console.log("invalid selection");
          return;
        }
        this.setState({
          selectedPosition: selectedMove
        });
      }
    }

  }

  makeMove = (selectedPosition, selectedMove) => {
    const { values, turn } = this.state;

    values[selectedPosition.index][selectedPosition.subIndex] = 0;
    values[selectedMove.index][selectedMove.subIndex] = selectedPosition.coin;

    console.log("making move");

    const nextTurn = (turn === 'black' ? 'white' : 'black');

    this.setState({
      values,
      selectedPosition: {
        index: -1,
        subIndex: -1
      },
      turn: nextTurn
    });

  }

  addClass = (value) => {
    const { rotate } = this.state;

    const chessClass = rotate ? "chess_images_rotate " : "";

    switch(value) {
      case 1:
        return chessClass + "chess_images black-pawn";
        break;
      case 10:
        return chessClass + "chess_images black-castle";
        break;
      case 9:
        return chessClass + "chess_images black-horse";
        break;
      case 8:
        return chessClass + "chess_images black-bishop";
        break;
      case 7:
        return chessClass + "chess_images black-queen";
        break;
      case 6:
        return chessClass + "chess_images black-king";
        break;
      case -1:
        return chessClass + "chess_images white-pawn";
        break;
      case -10:
        return chessClass + "chess_images white-castle";
        break;
      case -9:
        return chessClass + "chess_images white-horse";
        break;
      case -8:
        return chessClass + "chess_images white-bishop";
        break;
      case -7:
        return chessClass + "chess_images white-queen";
        break;
      case -6:
        return chessClass + "chess_images white-king";
        break;
      default:
        return "";
    }
  }

  render() {
    const { values, selectedPosition, rotate } = this.state;
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

    return (
      <div className="container">
        <br />
        <div className={`board-container ${ rotate ? "board-container-rotate" : " "} `}>
          { boardElements }
        </div>
        <br />
        <button onClick={()=>this.rotateBoard()}> Rotate Board </button>
        <br />
        <br />
      </div>
    );
  }
}
