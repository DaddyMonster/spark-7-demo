import { Button, InputBase, TextField } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { TestObject, useTestHook } from '../hooks/test-hook';

const Home = () => {
  const { add, refs, modify } = useTestHook();

  const docs = useMemo(() => refs.map((x) => x.data() as TestObject), [refs]);

  const [txt, settxt] = useState('');
  const [idx, setidx] = useState(-1);

  const handleModify = () => {
    if (idx < 0 || !txt) return;
    modify(idx, txt);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="flex justify-center items-center flex-wrap">
        {docs.map(({ age, hobby, name }, i) => (
          <div className="w-32 h-20" key={i} onClick={() => setidx(i)}>
            <span>{`${name}-${age}-${hobby}`}</span>
          </div>
        ))}
      </div>
      <Button onClick={add}>ADD</Button>
      <TextField value={txt} onChange={(e) => settxt(e.target.value)} />
      <InputBase type="number" />
      <Button onClick={handleModify}>MOD {`IDX : ${idx}`}</Button>
    </div>
  );
};

export default Home;
