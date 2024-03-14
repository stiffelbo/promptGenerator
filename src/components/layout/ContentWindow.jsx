const ContentWindow = ({ children }) => {
    return (
      <div className="h-full w-10/12 p-4 overflow-auto">
        {children}
      </div>
    );
  };

export default ContentWindow;