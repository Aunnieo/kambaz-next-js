"use client";
import PassingFunctions from "./PassingFunctions";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import PassingDataOnEvent from "./PassingDataOnEvent";
import BooleanStateVariables from "./BooleanStateVariables";
import ObjectStateVariable from "./ObjectStateVariable";
import DateStateVariable from "./DateStateVariable";
import StringStateVariables from "./StringStateVariables";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import store from "./store";
import { Provider } from "react-redux";
import HelloRedux from "./ReduxExamples/HelloRedux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import AddRedux from "./ReduxExamples/AddRedux";
import TodoList from "./ReduxExamples/todo/TodoList";
import TodoItem from "./ReduxExamples/todo/TodoItem";
import TodoForm from "./ReduxExamples/todo/TodoForm";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <Provider store={store}>
      <div id="wd-passing-functions">
        <h2>Lab 4</h2>

        <PassingFunctions theFunction={sayHello} />
        <ClickEvent />
        <Counter />
        <PassingDataOnEvent />
        <BooleanStateVariables />
        <ObjectStateVariable />
        <DateStateVariable />
        <ArrayStateVariable />
        <StringStateVariables />
        <ParentStateComponent />
        <ReduxExamples />
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <TodoList />
        <TodoForm />
        <TodoItem />
      </div>
    </Provider>
  );
}
