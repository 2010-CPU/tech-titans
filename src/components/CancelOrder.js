import { cancelOrder } from "../api"

const CancelCompleteOrder = () => {
    console.log('is there anybody out there????????????')

const handleCancel = async (orderId) => {
    console.log('I am starting to delete')
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


handleCancel()
.then(console.log)


const handleComplete = (orderId) => {
    console.log('I am starting to handle the complete order')
    if(!orderId) {
        return alert("there is no order to complete")
    }else {
        orderId.status = "completed"
        return alert("Your order is complete!")
    }
}

handleComplete();


};

CancelCompleteOrder()

export default CancelCompleteOrder;