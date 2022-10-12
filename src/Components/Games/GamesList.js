import ConwoyLogo from "../../assets/img/Game_of_Life.gif";
import TicTacToe from "../../assets/img/TicTacToe.gif";
import SnakeGame from "../../assets/img/SnakeGame.gif";

const games = [
  {
    id:"1",
    title:"Conwoy's Game of Life",
    desc:"A solo conceptual game designed by John Conwoy",
    logo: ConwoyLogo,
    path:"/ConwoyGame"
  },
  {
    id:"2",
    title:"Tic Tac Toe",
    desc:"Your Classic Retro Tic Tac Toe is here",
    logo: TicTacToe,
    path:"/TicTacToe"
  },
  {
    id:"3",
    title:"Snake Game",
    desc:"Coming to eat your apples",
    logo: SnakeGame,
    path: "/contact"
  }
]

export default games;