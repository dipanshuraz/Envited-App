import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const initialUsers = ["John Doe", "Mary Jane"];

  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState(initialUsers);

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const addUser = (name) => {
    setUsers((prev) => [...prev, name]);
  };

  return (
    <TodosContext.Provider
      value={{
        counter,
        incrementCounter,
        users,
        addUser,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
