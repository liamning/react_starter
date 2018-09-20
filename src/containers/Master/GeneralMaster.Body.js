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
            requiredError:"123123 123123123123 123123123123 123123123123 123123123123 123123",
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
        
        // ChiDesc: function (data, field, index, updateFieldComponent, setFieldValue) {

        //     setFieldValue('Code', index, data[index][field]);
        //     updateFieldComponent('Code', index);

        // }
    }

})
