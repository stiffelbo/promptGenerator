import TopBar from './TopBar';
import SideBar from './SideBar';
import ContentWindow from './ContentWindow';

const MainLayout = ({ children }) => {
    return (
      <div className="flex flex-col h-screen">
        <TopBar />
          {children}
      </div>
    );
  };

export default MainLayout;