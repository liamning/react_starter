import GeneralMasterBody from '../../views/Master/UserProfile.Body'
import WithFormEventBody from '../../components/WithFormEvent.Body'


export default WithFormEventBody(GeneralMasterBody, {
    validatePattern:{
        StaffName:{
            required:"",
            // pattern: /^\d[2]$/
        },
        // EngDesc:{
        //     required:"",
        //     requiredError:"123123 123123123123 123123123123 123123123123 123123123123 123123",
        // },
        // ChiDesc:{
        //     required:"",
        //     // pattern: /^\d{2}$/
        // }
    },
    // fieldChange: {
    //     EngDesc: function (data, field, index, updateFieldComponent, setFieldValue) {

    //         setFieldValue('ChiDesc', index, data[index][field]);
    //         updateFieldComponent('ChiDesc', index);

    //     },
        
    // }

})
