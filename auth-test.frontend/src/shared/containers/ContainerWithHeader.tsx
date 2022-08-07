import { ReactElement } from 'react';

import Header from './Header';

const ContainerWithHeader = ({ children }: { children: ReactElement }) => (
    <div className="w-screen h-screen grid grid-rows-[auto_1fr]">
        <Header></Header>
        <div className="max-w-[1600px] h-full w-full mx-auto flex flex-col overflow-auto">{children}</div>
    </div>
);

export default ContainerWithHeader;
