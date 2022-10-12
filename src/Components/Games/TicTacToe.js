import React,  {useState} from 'react';
import { Link } from 'react-router-dom';
import "./TicTacToe.css";

const Cell = (props) =>{
  // console.log(props.val);
  return (
    <div className={'tictactoe-cell '+((props.val===1)?'p1':(props.val===2)?'p2':'')}>
      <div></div>
    </div>
  )
}

const TicTacToe = (props) => {

  const [board,setBoard] = useState(Array(3).fill(0).map(ele => new Array(3).fill(0)));
  const [winner, setWinner] = useState(0);
  const [player,setPlayer] = useState(1);
  const [moves,setMoves] = useState(1);

  const setKey = (row,col) => {
    if (board[row][col]!==0) return
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col]=player;
    setPlayer(3-player);
    setBoard(newBoard);
    setMoves(moves+1);
    check();
  }

  const check = () => { 
    console.log(moves);
    
    if (moves === 9){
      setTimeout(()=>{
        setWinner(1);
        // reset();
      },200)
    }
  }

  // const checkWinner = () => {

  // }

  const reset = () => {
    setMoves(1);
    setPlayer(1);
    setWinner(0);
    setBoard(Array(3).fill(0).map(ele => new Array(3).fill(0)));
  }

  return (
  <div className='card'>
    <div className="card-header bg-dark text-white"><h3>
      { (props.backPath)? <i><Link className="header-link" to={props.backPath}>&larr;</Link>&nbsp;&nbsp;</i>:null}
      <strong>Tic Tac Toe</strong>
    </h3></div>
    <div className='card-body bg-black'>
      <div className='container row justify-content-center'>
        <table className={'tictactoe-board col-12 col-md-6 '+((winner)?"d-none":"")}><tbody> {
          board.map((boardRow,row)=>{
            return (
              <tr key={row}>
                {
                  boardRow.map((item,col)=>{
                    return <td className='tictactoe-cell' key={col}>
                      <div onClick={()=>{setKey(row,col)}}><Cell val={item}/></div>
                    </td>
                  })
                }
              </tr>
            )
          })
        } </tbody></table>
        <div className={'tictactoe-board text-lg col-12 col-md-6 '+((winner===0)?"d-none":"")}>
          <div className='tictactoe-res'>{(winner===1)?"Player 1 wins":"Player 2 wins"}</div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='btn btn-primary' onClick={reset}>Reset</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TicTacToe;