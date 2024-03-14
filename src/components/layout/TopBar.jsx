import MainNav from "../MainNav";
import LocalStorageIndicator from "../common/indicators/LocalStorageIndicator";

const TopBar = () => {
    return (
      <div className="w-full h-8 flex items-center px-1">
        <MainNav />
        <LocalStorageIndicator />
      </div>
    );
  };
  
  export default TopBar;