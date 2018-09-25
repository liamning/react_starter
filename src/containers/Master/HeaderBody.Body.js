import HeaderBodyBody from '../../views/Master/HeaderBody.Body'
import WithFormEventBody from '../../components/WithFormEvent.Body'


export default WithFormEventBody(HeaderBodyBody, {
    // validatePattern:{
    //     Code:{
    //         required:"",
    //         // pattern: /^\d[2]$/
    //     },
    //     EngDesc:{
    //         required:"",
    //         requiredError:"customized error message",
    //     },
    //     ChiDesc:{
    //         required:"",
    //         // pattern: /^\d{2}$/
    //     }
    // },
    // fieldChange: {
    //     EngDesc: function (data, field, index, updateFieldComponent, setFieldValue) {

    //         setFieldValue('ChiDesc', index, data[index][field]);
    //         updateFieldComponent('ChiDesc', index);

    //     },
        
    // },
    // disableds:{
    //     // ChiDesc: true,
    // }

})
