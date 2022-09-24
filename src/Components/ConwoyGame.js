import React, { useState} from "react";
import {Link} from 'react-router-dom';
import './ConwoyGame.css';

const Cell = ({row,col,state,board,setBoard})=>{
  return (
    <div className={"cell "+(state?"alive":"dead")} onClick={()=>{
      let newBoard= JSON.parse(JSON.stringify(board));
      newBoard[row][col]=!board[row][col];
      setBoard(newBoard);
    }}>
    </div>
  )
}

const ConwoyGame = () => {


  //Variables and States
  const rows=40;
  const cols=80;
  let [board, setBoard] = useState(Array(rows).fill().map(()=>{ return Array(cols).fill().map(()=> false)}));
  const [playInterval, setPlayInterval] = useState(null);
  const [generation , setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [customState, setCustomState] = useState("");
  const formations = {
    "gosper" : "[[2,26],[3,24],[3,26],[4,14],[4,15],[4,22],[4,23],[4,36],[4,37],[5,13],[5,17],[5,22],[5,23],[5,36],[5,37],[6,2],[6,3],[6,12],[6,18],[6,22],[6,23],[7,2],[7,3],[7,12],[7,16],[7,18],[7,19],[7,24],[7,26],[8,12],[8,18],[8,26],[9,13],[9,17],[10,14],[10,15]]",
    "centinel" : "[[13,6],[13,7],[13,56],[13,57],[14,7],[14,56],[15,7],[15,9],[15,31],[15,32],[15,54],[15,56],[16,8],[16,9],[16,31],[16,32],[16,45],[16,54],[16,55],[17,17],[17,18],[17,19],[17,45],[17,46],[18,17],[18,21],[18,46],[18,47],[19,17],[19,22],[19,41],[19,42],[19,45],[19,46],[20,18],[20,22],[22,18],[22,22],[23,17],[23,22],[23,41],[23,42],[23,45],[23,46],[24,17],[24,21],[24,46],[24,47],[25,17],[25,18],[25,19],[25,45],[25,46],[26,8],[26,9],[26,31],[26,32],[26,45],[26,54],[26,55],[27,7],[27,9],[27,31],[27,32],[27,54],[27,56],[28,7],[28,56],[29,6],[29,7],[29,56],[29,57]]",
    "bird" : "[[27,61],[27,62],[28,61],[28,63],[29,61],[29,70],[29,71],[29,72],[30,64],[30,68],[30,69],[30,71],[30,72],[31,64],[31,65],[31,67],[32,67],[32,68],[32,69],[34,64],[34,68],[34,70],[35,63],[35,64],[35,66],[35,68],[35,69],[35,70],[36,63],[36,67],[37,62],[37,63],[37,69],[38,62],[38,69],[39,63]]",
    "emergenextinct":"[[18,36],[18,37],[18,38],[18,40],[18,41],[18,42],[19,36],[19,38],[19,40],[19,42],[20,36],[20,37],[20,38],[20,40],[20,41],[20,42]]"
  }

  // Utility Functions 
  const nextState = () => {
    setGeneration(generation=>generation+1);
    setBoard(board=>{
      let newBoard = JSON.parse(JSON.stringify(board));
      for (let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
          let cnt=0;
          // counting neighbours
          for (let x=i-1;x<=i+1;x++){
            for (let y=j-1;y<=j+1;y++){
              if (x===i && y===j) continue;
              if (x>=0 && x<rows && y>=0 && y<cols){
                cnt+= board[x][y];
              }
            }
          }
          // updating cell
          if (board[i][j]){ newBoard[i][j]=(cnt<=3 && cnt>=2)?true:false; }
          else{ newBoard[i][j]= (cnt===3)?true:false; }
        }
      }
      return newBoard;
    })
  }

  const fast = () => {
    if (speed>100){
      setSpeed(speed-100);
    }
    if (playInterval){
      clearInterval(playInterval);
      setPlayInterval(setInterval(nextState,speed))
    }
  }

  const slow = () => {
    if (speed<2000){
      setSpeed(speed+100);
    }
    if (playInterval){
      clearInterval(playInterval);
      setPlayInterval(setInterval(nextState,speed))
    }
  }

  const seed = () => {
    setGeneration(0);
    let newBoard = JSON.parse(JSON.stringify(board));
    for (let i=0;i<rows;i++){
      for (let j=0;j<cols;j++){
        newBoard[i][j]=Boolean(Math.floor(Math.random()*2))
      }
    }
    setBoard(newBoard);
  }

  const play = () => {
    let interval= setInterval(nextState, speed);
    setPlayInterval(interval);
  }

  const pause = () => {
    if (playInterval){
      clearInterval(playInterval);
      setPlayInterval(null);
    }
  }

  const clearBoard = () => {
    pause();
    setBoard(Array(rows).fill().map(()=>{ return Array(cols).fill().map(()=> false)}));
    setGeneration(0);
  }

  const getState = () => {
    if (playInterval){
      pause();
    }
    let res=[];
    for(let i=0;i<rows;i++){
      for(let j=0;j<cols;j++){
        if (board[i][j]){
          res.push([i,j]);
        }
      }
    }
    alert(JSON.stringify(res));
  }

  const setBoardState = (obtained) => {
    let newState = JSON.parse(obtained);
    clearBoard();
    let newBoard= Array(rows).fill().map(()=>{ return Array(cols).fill().map(()=> false)});
    for (let e of newState){
      console.log(e);
      newBoard[e[0]][e[1]]=true;
    }
    setBoard(newBoard);
  }

  const evaluateCustomBoard = (customState) => {
    setBoardState(customState);
  }

  return (
    <>
    <div className="card justify-content-center">
      <div className="card-header bg-dark text-white"><h3>
        <i><Link className="header-link" to="../../home">&larr;</Link></i>&nbsp;&nbsp;
        <strong>Conwoy's Game of Life</strong>
      </h3></div>
      <div className="card-body bg-black justify-content-center">
        <div className="container">
          <div className="row">
            <div className="btn-group col-sm-2">
              <div className={"btn btn-"+(playInterval?"danger":"success")} onClick={(playInterval?pause:play)}><strong>{playInterval?"Stop":"Play"}</strong></div>
              <div className="btn btn-primary" onClick={nextState}><strong>Next</strong></div>
            </div>
            <div className="btn-group col-sm-2">
              <div className="btn btn-success" onClick={fast}><strong>Fast</strong></div>
              <div className="btn btn-danger" onClick={slow}><strong>Slow</strong></div>
            </div>
            <div className="btn-group col-sm-2">
              <div className="btn btn-primary" onClick={seed}><strong>Seed</strong></div>
              <div className="btn btn-danger" onClick={clearBoard}><strong>Clear</strong></div>
            </div>
            <div className="btn-group col-sm-4">
              <div className="btn btn-primary" onClick={getState}><strong>Check</strong></div>
              <input className="" type="text" value={customState} placeholder="Enter Code" onChange={event=>setCustomState(event.target.value)}></input>
              <div className="btn btn-dark" onClick={()=>setBoardState(evaluateCustomBoard(customState))}><strong>Set </strong></div>
            </div>
            <div className="text-white col-sm-2">
              <strong>Speed : { speed } ms &nbsp; &nbsp; &nbsp; Generation : {generation}</strong>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-9">
            <table className="col-auto gameBoard"><tbody>
              {
                board.map((boardRow,row)=>{
                  return <tr key={row}>{boardRow.map((state,col)=>{
                    return <td key={col}><Cell {...{row,col,state,board,setBoard}} row={row} col={col} state={state} board={board} setBoard={setBoard}/></td>
                  })}</tr>
                })
              }
            </tbody></table>
          </div>
          <div className="col-3 mr-0">
            <div className="row"><div className="btn label col-10 text-white"><strong>FORMATIONS</strong></div></div>
            <div className="row mt-1"><div className="btn btn-info col-10" onClick={()=>setBoardState(formations["gosper"])}><i>Gosper Glider Gun</i></div></div>
            <div className="row mt-1"><div className="btn btn-info col-10" onClick={()=>setBoardState(formations["centinel"])}><i>Centinel</i></div></div>
            <div className="row mt-1"><div className="btn btn-info col-10" onClick={()=>setBoardState(formations["bird"])}><i>Bird</i></div></div>
            <div className="row mt-1"><div className="btn btn-info col-10" onClick={()=>setBoardState(formations["emergenextinct"])}><i>Emerge &amp; Extinct</i></div></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ConwoyGame;