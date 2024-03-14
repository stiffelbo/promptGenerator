import { useEffect, useState } from "react";
import {toast} from 'react-toastify';

import ContentWindow from "../../components/layout/ContentWindow";
import SideBar from "../../components/layout/SideBar";

import PresetsList from "./PresetsList";
import Preset from "./Preset";
import ls from './../../services/ls';

const Presets = () => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState('');

    const populate = () => {
        const lsData = ls.getItem('presets');
        setData(lsData);
    }

    useEffect(()=>{
        populate();
    },[]);

    useEffect(()=>{
        console.log(data);
    }, [data]);

    const getCurrentItem = () => data.find(item => item.name === current);

    const handleDelete = name => {
        const presentData = [...data];
        const filteredData = presentData.filter(item => item.name !== name);
        ls.setItem('presets', filteredData);
        setData(filteredData);
        
    }

    const handleAdd = fd => {
        if(typeof fd !== 'object' || fd === null || !fd.preset){
            toast.warning(`błąd danych: ${fd.toString()}`);
            return;
        }
        const defaultItem = {name: fd.preset, objectives : [
            {name: 'Description', value: 'lorem ipsum tralalalalalal'},
        ]};
        const presentData = [...data];
        presentData.push(defaultItem);
        ls.setItem('presets', presentData);
        setData(presentData);
        setCurrent(fd.preset);       
    }

    const handleEditPresetName = (name, newValue) => {
        const presentData = [...data];
        const index = presentData.findIndex(item => item.name === name);
        if (index !== -1) {
            const updatedElement = { ...presentData[index], name: newValue };
            presentData[index] = updatedElement;
            ls.setItem('presets', presentData);
            setData(presentData);
            setCurrent(newValue);
        } else {
            // Optionally handle the case where the item is not found
            toast.error('nie znaleziono presetu');
        }
    }

    const handleAddObjective = (name, objectiveName) =>{
        const presentData = [...data];
        const index = presentData.findIndex(item => item.name === name);
        if (index !== -1) {
            presentData[index]['objectives'].push({name: objectiveName, value: ''});
            ls.setItem('presets', presentData);
            setData(presentData);
        } else {
            // Optionally handle the case where the item is not found
            toast.error('nie znaleziono presetu');
        }
    }

    const handleDeleteObjective = (name, idx) => {
        const presentData = [...data];
        const index = presentData.findIndex(item => item.name === name);
        if (index !== -1) {
            presentData[index]['objectives'].splice(idx, 1);
            ls.setItem('presets', presentData);
            setData(presentData);
        } else {
            // Optionally handle the case where the item is not found
            toast.error('nie znaleziono presetu celu dla presetu ' + name);
        }
    }

    const handleEditObjectiveName = (name, idx, value) => {
        console.log(name,idx,value);
        const presentData = [...data];
        const index = presentData.findIndex(item => item.name === name);
        console.log(index);
        if (index !== -1) {
            presentData[index]['objectives'][idx]['name'] = value;
            ls.setItem('presets', presentData);
            setData(presentData);
        } else {
            // Optionally handle the case where the item is not found
            toast.error('nie znaleziono presetu celu dla presetu ' + name);
        }
    }
    const handleEditObjectiveValue = (name, idx, value) => {
        const presentData = [...data];
        const index = presentData.findIndex(item => item.name === name);
        if (index !== -1) {
            presentData[index]['objectives'][idx]['value'] = value;
            ls.setItem('presets', presentData);
            setData(presentData);
        } else {
            // Optionally handle the case where the item is not found
            toast.error('nie znaleziono presetu celu dla presetu ' + name);
        }
    }

    const currentItem = getCurrentItem();

    return ( 
        <div className="flex flex-row flex-grow">
            <SideBar>
                <PresetsList data={data} current={current} setCurrent={setCurrent}/>
            </SideBar>
            <ContentWindow>
                <Preset 
                    data={currentItem} 
                    onClose={()=>{setCurrent('')}} 
                    onDelete={()=>handleDelete(currentItem.name)} 
                    onAdd={handleAdd}
                    onEditPresetName={handleEditPresetName}
                    onAddObjective={handleAddObjective}
                    onDeleteObjective={handleDeleteObjective}
                    onObjectiveNameEdit={handleEditObjectiveName} 
                    onObjectiveValueEdit={handleEditObjectiveValue}
                />
            </ContentWindow>
        </div>
    );
}
 
export default Presets;