import GeneralMasterBody from '../../views/Master/GeneralMaster.Body'
import WithFormEventBody from '../../components/WithFormEvent.Body'


export default WithFormEventBody(GeneralMasterBody, {
    validatePattern:{
        Code:{
            required:"",
            // pattern: /^\d[2]$/
        },
        EngDesc:{
            required:"",
            requiredError:"customized error message",
        },
        ChiDesc:{
            required:"",
            // pattern: /^\d{2}$/
        }
    },
    fieldChange: {
        EngDesc: function (data, field, index, updateFieldComponent, setFieldValue) {

            setFieldValue('ChiDesc', index, data[index][field]);
            updateFieldComponent('ChiDesc', index);

        },
        
    },
    disableds:{
        ChiDesc: true,
    }

})
