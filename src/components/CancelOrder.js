import { cancelOrder, completeOrder } from "../api"

const CancelCompleteOrder = () => {
    console.log('is there anybody out there????????????')

    const handleCancel = async (orderId) => {
    if(!orderId) {
        return alert("There is no order to delete")
    }else{
    try{
        await cancelOrder(orderId)
    }catch(error){
        throw error;
    }
    }
}


handleCancel(1)


const handleComplete = async(orderId) => {
    console.log('I am starting to handle the complete order')
    if(!orderId) {
        return alert("there is no order to complete")
    }else {
       await completeOrder(orderId)
    }
}

handleComplete(1)



};

CancelCompleteOrder()

export default CancelCompleteOrder;