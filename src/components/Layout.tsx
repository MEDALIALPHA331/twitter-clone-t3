export const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-3 gap-4">{children}</div>;
};

export const Seperator = () => {
  return <div className="p-4" />;
};

export const Line = () => {
  return <hr className="my-2 border-[1px] border-[#121212]" />;
};
