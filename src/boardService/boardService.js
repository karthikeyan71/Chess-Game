const pawn = (currentPosition, nextPosition) => {

  console.log("Inside the pawn service");

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  if ( (nextIndex-1 === index || nextIndex+1 === index)
    &&
    (subIndex-1 === nextSubIndex || subIndex === nextSubIndex || subIndex+1 === nextSubIndex) ) {
    return true;
  }
  return false;
}

const horse = (currentPosition, nextPosition) => {

  console.log("Inside the horse service");

  const { index, subIndex, coin } = currentPosition;
  const nextIndex = nextPosition.index;
  const nextSubIndex = nextPosition.subIndex;

  const indexCheck = (nextIndex, nextSubIndex) => {
    if(nextIndex-1 === index ) {
      console.log("came here");
    }
    return true;
  }

  if ( indexCheck(nextIndex, nextSubIndex) ) {
    console.log("checking the index");
    return true;
  } else {
    console.log("in the horse else case");
  }

  return false;
}

export {
  pawn,
  horse
};
