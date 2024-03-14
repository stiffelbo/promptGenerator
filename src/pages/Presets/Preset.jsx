import { useState } from 'react';
import { Card, CardHeader, CardActions, CardContent, IconButton, TextField, Accordion, AccordionSummary, AccordionDetails, Box, Alert, List, ListItem, ListItemAvatar, ListItemText, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PresetForm from './PresetForm';

const Preset = ({ data, onClose, onDelete, onAdd, onEditPresetName, onAddObjective, onDeleteObjective, onObjectiveNameEdit, onObjectiveValueEdit }) => {
    const [isEditing, setIsEditing] = useState(false); // State to track edit mode
    const [editNameObjectiveIndex, setEditNameObjectiveIndex] = useState(null);
    const [editValueObjectiveIndex, setEditValueObjectiveIndex] = useState(null);
    const [newObjectiveName, setNewObjectiveName] = useState(null);
    const [newObjectiveValue, setNewObjectiveValue] = useState(null);
    const [newName, setNewName] = useState(data ? data.name : ''); // State for the new name input value
    const [newObjective, setNewObjective] = useState('');
    // Toggle edit mode on and off
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setNewName(data ? data.name : ''); // Reset newName to current name when toggling off
    };

    // Handle input change
    const handleInputChange = (val) => {
        setNewName(val);
    };

    // Save the new name
    const handleSaveName = () => {
        if (newName && newName !== data.name) {
            onEditPresetName(data.name, newName); // Use the provided handler
            setIsEditing(false); // Exit edit mode
        }
    };

    if (!data) return <PresetForm onSubmit={onAdd} />;

    const renderNameForm = () => {
        return <TextField
            fullWidth
            value={newName}
            onChange={e => handleInputChange(e.target.value)}
            autoFocus onBlur={toggleEdit}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    handleSaveName();
                }
            }}
            title="zatwierdz edycje enterem"
        />
    }

    const renderGrid = () => {
        if (!Array.isArray(data.objectives)) return;

        return <Box>
            {data.objectives.map((item, index) => {

                const nameField = () => {
                    if (index === editNameObjectiveIndex) {
                        return <TextField
                                    value={newObjectiveName}
                                    fullWidth
                                    onChange={e => setNewObjectiveName(e.target.value)}
                                    autoFocus
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            onObjectiveNameEdit(data.name, index, newObjectiveName);
                                            setEditNameObjectiveIndex(null);
                                            setNewObjectiveName(null);
                                        }
                                    }}
                                    onBlur={() => setEditNameObjectiveIndex(null)}
                                    rows={6}
                                    sx={{ marginTop: '1em' }}
                                    title="zatwierdz edycje enterem"
                                />
                    }else{
                        if(item.name){
                            return <Typography variant="body2" onDoubleClick={()=>{
                                setEditNameObjectiveIndex(index);
                                setNewObjectiveName(item.name);
                            }}>{item.name}</Typography>
                        }else{
                            return <IconButton onClick={()=>setEditNameObjectiveIndex(index)}><EditIcon /></IconButton>
                        }                                          
                    }
                }
                const valueField = () => {                    
                    if (index === editValueObjectiveIndex) {
                        return <TextField
                                    value={newObjectiveValue}
                                    fullWidth
                                    onChange={e => setNewObjectiveValue(e.target.value)}
                                    autoFocus
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            onObjectiveValueEdit(data.name, index, newObjectiveValue);
                                            setEditValueObjectiveIndex(null);
                                            setNewObjectiveValue(null);
                                        }
                                    }}
                                    onBlur={() => setEditValueObjectiveIndex(null)}
                                    rows={6}
                                    sx={{ marginTop: '1em' }}
                                    title="zatwierdz edycje enterem"
                                />
                    }else{
                        if(item.value){
                            return <Typography 
                                variant="body2" 
                                onDoubleClick={()=>{
                                    setEditValueObjectiveIndex(index);
                                    setNewObjectiveValue(item.value);
                                }}>{item.value}</Typography>
                        }else{
                            return <IconButton onClick={()=>{
                                setEditValueObjectiveIndex(index);
                                setNewObjectiveValue(item.value);
                            }}><EditIcon /></IconButton>
                        }
                    }
                }

                return (
                    <Grid container key={index} spacing={3} sx={{borderBottom: '1px solid lightgray', height: '6em'}}>
                        <Grid item>
                            <IconButton color="error" onClick={()=>onDeleteObjective(data.name, index)}><DeleteForeverIcon /></IconButton>
                        </Grid>
                        <Grid item md={3}>
                            {nameField()}
                        </Grid>
                        <Grid item md={8}>
                            {valueField()}
                        </Grid>
                    </Grid>
                )
            })}
        </Box>
    }

    const renderAddObjective = () => {
        return <TextField
            value={newObjective}
            label="Dodaj Cel"
            fullWidth
            onChange={e => setNewObjective(e.target.value)}
            autoFocus
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onAddObjective(data.name, newObjective);
                }
            }}
            onBlur={() => setNewObjective('')}
            sx={{ marginTop: '1em' }}
            title="zatwierdz edycje enterem"
        />
    }

    return (
        <Card>
            <CardHeader
                title={isEditing ? (
                    renderNameForm()
                ) : (
                    <Typography variant="h5" onDoubleClick={toggleEdit}>{data.name}</Typography>
                )}
                action={<IconButton onClick={onClose} color="error" title="Zamknij"><ClearIcon /></IconButton>}
            />
            <CardContent>

                {renderGrid()}
                {renderAddObjective()}
            </CardContent>
            <CardActions>
                <IconButton onClick={onDelete} color="error" title="Usuń Preset"><DeleteForeverIcon /></IconButton>
            </CardActions>
        </Card>
    );
};

export default Preset;