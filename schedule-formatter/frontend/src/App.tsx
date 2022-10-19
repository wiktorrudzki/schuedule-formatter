import { useReducer } from "react";
import Nav from "./components/nav";
import Template from "./components/template";
import "./app.css";
import { Actions, CurrentGroups } from "./components/nav/module";

function App() {
  const daysOfWeek = [
    "Godzina",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
  ];

  const groups = {
    week: ["N", "P"],
    k: ["12K1", "12K2"],
    gl: ["L01", "L02", "L03", "L04"],
    gk: ["K01", "K02", "K03"],
    gp: ["P01", "P02", "P03"],
  };

  const reducer = (state: CurrentGroups, action: Actions) => {
    switch (action.type) {
      case "WEEK":
        return { ...state, week: action.newGroup };
      case "K":
        return { ...state, k: action.newGroup };
      case "GL":
        return { ...state, gl: action.newGroup };
      case "GK":
        return { ...state, gk: action.newGroup };
      case "GP":
        return { ...state, gp: action.newGroup };
      default:
        return state;
    }
  };

  const [currentGroups, currentGroupsDispatch] = useReducer(reducer, {
    week: groups.week[0],
    k: groups.k[0],
    gl: groups.gl[0],
    gk: groups.gk[0],
    gp: groups.gp[0],
  });

  return (
    <div className="app">
      <Nav currentGroups={currentGroups} currentGroupsDispatch={currentGroupsDispatch} />
      <Template rows={15} columns={6} daysOfWeek={daysOfWeek} currentGroups={currentGroups} currentGroupsDispatch={currentGroupsDispatch} />
    </div>
  );
}

export default App;