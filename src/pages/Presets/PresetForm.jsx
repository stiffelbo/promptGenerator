import FormTemplate from '../../components/form/formTemplate';

const defaultSchema = [
    {name: 'preset', label: 'Nazwa Presetu', type: 'text', md: 12, xl: 12}
];

const PresetForm = ({value=null, onSubmit, schema=defaultSchema}) => {
    
    return ( 
        <FormTemplate 
            schema={schema}
            onSubmit={onSubmit}
            formLabel='Dodaj Preset'
            data={value}
        />
    );
}
 
export default PresetForm;