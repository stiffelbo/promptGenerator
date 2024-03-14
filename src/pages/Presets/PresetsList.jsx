import { useEffect, useState } from 'react';
import {debounce} from '../../utils/debounce';
//MUI
import {Accordion, AccordionSummary, AccordionDetails, Box, Alert, List, ListItem, ListItemAvatar, ListItemText, Typography, Grid} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//Comp
import InputCheckbox from './../../components/form/inputCheckbox';
import InputText from '../../components/form/inputText';

const handleFilter = (filter, data, setFiltered) => {
    let filtered = [...data];

    if (filter) {
        setFiltered(filtered.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())));
    } else {
        setFiltered(filtered);
    }
}

const debouncedFilter = debounce(handleFilter, 300);

const PresetsList = ({data = [], current, setCurrent}) => {
    if(!data.length) return <Alert severity='info'>Brak Presetów</Alert>
    
    const [filter, setFilter] = useState('');
    const [filtered, setFiltered] = useState(data);

    useEffect(()=>{
        debouncedFilter(filter, data, setFiltered);
    }, [filter, data]);
    
    const handleCheck = (name) => {
        if(current === name){
            setCurrent('');
        }else{
            setCurrent(name);
        }
    }

    return ( 
        <Box>
            <InputText onChange={val => setFilter(val)} value={filter} placeholder='Wyszukaj...'/>
            {filtered.map((item, index) => {
                return (<Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panelId-${index}`}
                        id={`id-${index}`}
                    >
                        <InputCheckbox 
                            value={item.name === current}
                            onChange={() => handleCheck(item.name)}
                            label={`${item.name} (${item.objectives.length})`}
                            labelPlacement='end'
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {item.objectives.map((objective, idx) => {
                                return (<ListItem key={`${index} - ${idx}`}>
                                    <ListItemText>{objective.name}</ListItemText>
                                </ListItem>)
                            })}
                        </List>                        
                    </AccordionDetails>
                </Accordion>);
            })}
        </Box>
    );
}
 
export default PresetsList;