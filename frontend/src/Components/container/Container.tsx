// Container.tsx

import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className=" mx-16 my-5 pl-15 pr-15">{children}</div>;
};

export default Container;
