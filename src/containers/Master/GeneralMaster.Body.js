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
        },
        ChiDesc:{
            required:"",
        }
    },
    fieldChange: {
        EngDesc: function (data, index, updateFieldComponent) {

            data[index]["ChiDesc"] = data[index]["EngDesc"];
            updateFieldComponent('ChiDesc', index);

        }
    }

})