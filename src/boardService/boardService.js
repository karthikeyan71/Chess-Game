const pawn = (currentPosition, nextPosition, values) => {

  console.log('Inside the pawn service');

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  if ((coin > 0 && values[nextIndex][nextSubIndex] > 0) || (coin < 0 && values[nextIndex][nextSubIndex] < 0)  ) {
    return false;
  }
  if(coin > 0) {
    if (nextIndex-1 === index && subIndex === nextSubIndex) {
      return true;
    } else if (nextIndex-1 === index && (subIndex -1  === nextSubIndex || subIndex + 1 === nextSubIndex) && nextPosition.coin < 0 ) {
      return true;
    }
  } else {
    if (nextIndex+1 === index && subIndex === nextSubIndex) {
      return true;
    } else if (nextIndex+1 === index && (subIndex -1  === nextSubIndex || subIndex + 1 === nextSubIndex) && nextPosition.coin > 0 ) {
      return true;
    }
  }
  return false;
}

const horse = (currentPosition, nextPosition, values) => {

  console.log('Inside the horse service');

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  if ((coin > 0 && values[nextIndex][nextSubIndex] > 0) || (coin < 0 && values[nextIndex][nextSubIndex] < 0)  ) {
    return false;
  }

  const stepCheck = (nextIndex, nextSubIndex) => {
    if (nextIndex-1 === index && nextSubIndex-2 === subIndex) {
      return true;
    } else if (nextIndex-1 === index && nextSubIndex+2 === subIndex) {
      return true;
    } else if (nextIndex+1 === index && nextSubIndex+2 === subIndex) {
      return true;
    } else if (nextIndex+1 === index && nextSubIndex-2 === subIndex) {
      return true;
    } else if (nextIndex-2 === index && nextSubIndex+1 === subIndex) {
      return true;
    } else if (nextIndex-2 === index && nextSubIndex-1 === subIndex) {
      return true;
    } else if (nextIndex+2 === index && nextSubIndex+1 === subIndex) {
      return true;
    } else if (nextIndex+2 === index && nextSubIndex-1 === subIndex) {
      return true;
    }
    return false;
  }

  if ( stepCheck(nextIndex, nextSubIndex) ) {
    return true;
  }

  return false;
}

const bishop = (currentPosition, nextPosition, values) => {

  console.log("Inside the bishop service");

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  const checkObstacle = (position, nextIndex, nextSubIndex) => {
    let i = nextIndex;
    let j = nextSubIndex;
    const iterate = () => {
      if (position === 'BottomLeft') {
        i -= 1;
        j += 1
      } else if (position === 'BottomRight') {
        i -= 1;
        j -= 1
      } else if (position === 'TopRight') {
        i += 1;
        j -= 1
      } else {
        i += 1;
        j += 1
      }
    }
    if ((coin > 0 && values[nextIndex][nextSubIndex] > 0) || (coin < 0 && values[nextIndex][nextSubIndex] < 0)  ) {
      return false;
    }
    iterate();

    while(i !== index && j !== subIndex) {
      if (values[i][j] !== 0) {
        return false;
      }
      iterate();
    }
    return true;
  }

  const stepCheck = (nextIndex, nextSubIndex) => {
    const below = nextIndex-index;
    const above = index - nextIndex;
    if (nextSubIndex-below === subIndex && index < nextIndex) {
      return checkObstacle('BottomRight', nextIndex, nextSubIndex);
    } else if (nextSubIndex+below === subIndex && index < nextIndex) {
      return checkObstacle('BottomLeft', nextIndex, nextSubIndex);
    } else if (nextSubIndex-above === subIndex) {
      return checkObstacle('TopRight', nextIndex, nextSubIndex);
    } else if (nextSubIndex+above === subIndex) {
      return checkObstacle('TopLeft', nextIndex, nextSubIndex);
    }
    return false;
  }

  if ( stepCheck(nextIndex, nextSubIndex) ) {
    return true;
  }

  return false;
}

const castle = (currentPosition, nextPosition, values) => {

  console.log('Inside the castle service');

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  const checkObstacle = (position, nextIndex, nextSubIndex) => {
    let i = nextIndex;
    let j = nextSubIndex;
    const iterate = () => {
      if (position === 'Left') {
        j += 1;
      } else if (position === 'Right') {
        j -= 1;
      } else if (position === 'Top') {
        i += 1;
      } else {
        i -= 1;
      }
    }
    if ((coin > 0 && values[nextIndex][nextSubIndex] > 0) || (coin < 0 && values[nextIndex][nextSubIndex] < 0)  ) {
      return false;
    }
    iterate();

    while(i !== index || j !== subIndex) {
      if (values[i][j] !== 0) {
        return false;
      }
      iterate();
    }
    return true;
  }

  const stepCheck = (nextIndex, nextSubIndex) => {
    if (nextIndex === index && nextSubIndex > subIndex) {
      return checkObstacle('Right', nextIndex, nextSubIndex);
    } else if (nextIndex === index && nextSubIndex < subIndex) {
      return checkObstacle('Left', nextIndex, nextSubIndex);
    } else if (nextIndex > index && nextSubIndex === subIndex) {
      return checkObstacle('Bottom', nextIndex, nextSubIndex);
    } else if (nextIndex < index && nextSubIndex === subIndex) {
      return checkObstacle('Top', nextIndex, nextSubIndex);
    }
    return false;
  }

  if ( stepCheck(nextIndex, nextSubIndex) ) {
    return true;
  }

  return false;
}

const queen = (currentPosition, nextPosition, values) => {

  console.log('Inside the queen service');

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  const checkObstacle = (position, nextIndex, nextSubIndex) => {
    let i = nextIndex;
    let j = nextSubIndex;
    const iterate = () => {
      if (position === 'Left') {
        j += 1;
      } else if (position === 'Right') {
        j -= 1;
      } else if (position === 'Top') {
        i += 1;
      } else if (position === 'Bottom') {
        i -= 1;
      } else if (position === 'BottomLeft') {
        i -= 1;
        j += 1
      } else if (position === 'BottomRight') {
        i -= 1;
        j -= 1
      } else if (position === 'TopRight') {
        i += 1;
        j -= 1
      } else {
        i += 1;
        j += 1
      }
    }
    if ((coin > 0 && values[nextIndex][nextSubIndex] > 0) || (coin < 0 && values[nextIndex][nextSubIndex] < 0)  ) {
      return false;
    }
    iterate();

    while(i !== index || j !== subIndex) {
      if (values[i][j] !== 0) {
        return false;
      }
      iterate();
    }
    return true;
  }

  const stepCheck = (nextIndex, nextSubIndex) => {
    const below = nextIndex-index;
    const above = index - nextIndex;
    if ( nextIndex === index && nextSubIndex > subIndex) {
      return checkObstacle('Right', nextIndex, nextSubIndex);
    } else if ( nextIndex === index && nextSubIndex < subIndex) {
      return checkObstacle('Left', nextIndex, nextSubIndex);
    } else if ( nextIndex > index && nextSubIndex === subIndex) {
      return checkObstacle('Bottom', nextIndex, nextSubIndex);
    } else if ( nextIndex < index && nextSubIndex === subIndex) {
      return checkObstacle('Top', nextIndex, nextSubIndex);
    } else if (nextSubIndex-below === subIndex && index < nextIndex) {
      return checkObstacle('BottomRight', nextIndex, nextSubIndex);
    } else if (nextSubIndex+below === subIndex && index < nextIndex) {
      return checkObstacle('BottomLeft', nextIndex, nextSubIndex);
    } else if (nextSubIndex-above === subIndex) {
      return checkObstacle('TopRight', nextIndex, nextSubIndex);
    } else if (nextSubIndex+above === subIndex) {
      return checkObstacle('TopLeft', nextIndex, nextSubIndex);
    }
    return false;
  }

  if ( stepCheck(nextIndex, nextSubIndex) ) {
    return true;
  }

  return false;
}

const king = (currentPosition, nextPosition, values) => {

  console.log('Inside the king service');

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  if ((coin > 0 && values[nextIndex][nextSubIndex] > 0) || (coin < 0 && values[nextIndex][nextSubIndex] < 0)  ) {
    return false;
  }

  const checkSides = (sides) => {
    for ( let k = 0; k < sides.length; k += 1 ) {
      let i = nextIndex;
      let j = nextSubIndex;
      if (sides[k] === 'Left') {
        j -= 1;
      } else if (sides[k] === 'Right') {
        j += 1;
      } else if (sides[k] === 'Top') {
        i -= 1;
      } else if (sides[k] === 'Bottom') {
        i += 1;
      } else if (sides[k] === 'BottomLeft') {
        i += 1;
        j -= 1
      } else if (sides[k] === 'BottomRight') {
        i += 1;
        j += 1
      } else if (sides[k] === 'TopRight') {
        i -= 1;
        j += 1
      } else {
        i -= 1;
        j -= 1
      }

      if ((coin === 6 && values[i][j] === -6) || (coin === -6 && values[i][j] === 6)) {
        return false;
      }
    }
    return true;
  }

  const checkOtherKing = () => {
    if (nextSubIndex === 7 && nextIndex === 7) {
      return checkSides(['Left', 'Top', 'TopLeft']);
    } else if(nextSubIndex === 7 && nextIndex < 7) {
      return checkSides(['Left', 'Top', 'Bottom', 'TopLeft', 'BottomLeft']);
    } else if(nextSubIndex < 7 && nextIndex === 7) {
      return checkSides(['Left', 'Top', 'Right', 'TopLeft', 'TopRight']);
    } else if(nextSubIndex < 7 && nextIndex === 0) {
      return checkSides(['Left', 'Bottom', 'Right', 'BottomLeft', 'BottomRight']);
    } else if(nextSubIndex === 0 && nextIndex < 7) {
      return checkSides(['Top', 'Bottom', 'Right', 'TopRight', 'BottomRight']);
    } else if(nextSubIndex === 0 && nextIndex === 0) {
      return checkSides(['Bottom', 'Right', 'BottomRight']);
    } else if (nextSubIndex < 7 && nextIndex < 7) {
      return checkSides(['Left', 'Top', 'Right', 'Bottom', 'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight']);
    }
  }

  if ( (nextIndex-1 === index || nextIndex+1 === index || nextIndex === index)
    &&
    (subIndex-1 === nextSubIndex || subIndex === nextSubIndex || subIndex+1 === nextSubIndex) ) {
    return checkOtherKing(nextIndex, nextSubIndex);
  }
  return false;
}

export {
  pawn,
  horse,
  bishop,
  castle,
  queen,
  king
};
