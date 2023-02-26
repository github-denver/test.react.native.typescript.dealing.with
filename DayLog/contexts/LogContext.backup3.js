import React, {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [logs, setLogs] = useState(
    Array.from({length: 10})
      .map((_, index) => ({
        id: uuidv4(),
        title: `Log ${index}`,
        body: `Log ${index}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
  );

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = (modified) => {
    console.group('const onModify = (modified) => { .. }');
    console.log('modified: ', JSON.stringify(modified, null, 2));

    // logs 배열을 순회해 id가 일치하면 log를 교체하고 그렇지 않으면 유지합니다.
    const nextLogs = logs.map((log) =>
      log.id === modified.id ? modified : log,
    );

    setLogs(nextLogs);
    console.groupEnd();
  };

  const onRemove = (id) => {
    console.group('const onRemove = (id) => { .. }');
    console.log('id: ', id);

    const nextLogs = logs.filter((log) => log.id !== id);

    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
