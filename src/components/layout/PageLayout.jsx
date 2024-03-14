import ContentWindow from "./ContentWindow";
import SideBar from "./SideBar";

const PageLayout = ({sidebar, main}) => {
    return ( 
        <div className="flex flex-row flex-grow">
            <SideBar>{sidebar}</SideBar>
            <ContentWindow>{main}</ContentWindow>
        </div>
    );
}
 
export default PageLayout;