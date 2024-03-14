import TopBar from './TopBar';
import SideBar from './SideBar';
import ContentWindow from './ContentWindow';

const MainLayout = ({ children }) => {
    return (
      <div className="flex flex-col h-screen">
        <TopBar />
        <div className="flex flex-row flex-grow">
          <SideBar />
          <ContentWindow>{children}</ContentWindow>
        </div>
      </div>
    );
  };

export default MainLayout;