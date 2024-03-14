const SideBar = ({children}) => {
  return (
    <div className="h-full bg-white w-2/12 p-4 overflow-auto">
      {children}
    </div>
  );
};
  
  export default SideBar;