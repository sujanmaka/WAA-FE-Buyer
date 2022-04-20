import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/config/storeConfig";

const CartDetail = (props) => {

    const [qty, setQty] = useState(0);

    const qtyRef = useRef();


    const onChangeHandler = (e) => {
        setQty(qtyRef.current.value);
    }


    const dispatch = useDispatch();

    const onQuantityChangeHandler = (e) => {
        e.preventDefault();
        dispatch(cartAction.update(data));
    }

    const onItemDeleteHandler = (e) => {
        e.preventDefault();
        dispatch(cartAction.delete(data))
    }

    const data = {
        id: props.productData.id,
        quantity: parseInt(qty),
        cost: props.productData.cost
    }

    return (
        <tr>
            <td data-th="Product">
                <div className="row">
                    <div className="col-md-3 text-left">
                        <img src={props.productData.picture} alt={props.productData.name} className="img-fluid d-none d-md-block rounded mb-2 shadow " />
                    </div>
                    <div className="col-md-9 text-left mt-sm-2">
                        <h4>{props.productData.name}</h4>
                        <p className="font-weight-light">{props.productData.description}</p>
                    </div>
                </div>
            </td>
            <td data-th="Price">${props.productData.cost}</td>
            <td data-th="Quantity">
                <input type="number" min={0} className="form-control form-control-lg text-center" id="qty" ref={qtyRef} onChange={(e) => onChangeHandler(e)} defaultValue={props.productData.quantity} />
            </td>
            <td data-th="Price">${props.productData.cost * props.productData.quantity}</td>
            <td className="actions" data-th="">
                <div className="text-right">
                    <button className="btn btn-primary" onClick={(e) => onQuantityChangeHandler(e)}>
                        <i className="fa-solid fa-rotate"></i>
                    </button>

                    <button className="btn btn-danger" style={{ "marginLeft": "10px" }} onClick={(e) => onItemDeleteHandler(e)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>


                </div>
            </td>
        </tr>
    )

}
export default CartDetail;