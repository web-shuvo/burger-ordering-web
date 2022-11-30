let OrderCount = (props) => {
    let info = props.info;
    let item = info.items.map((val, id) => {
        return (
            <span key={id} className='orderCSpan text-uppercase' ><span>{val.type} :-</span> {val.amount}</span>
        )
    });

    return (
        <div className="col-lg-5 text-center orderCount">
            <h4>Order Number: {info.id}</h4>
            {item}
            <div>
                <h4><strong>Tottal Price: {info.Price} BDT</strong></h4>
                <h6 className="fs-2">Deliver to:</h6>
                <p className="fs-5"><strong>Address:</strong> {info.Address.Address}</p>
                <p className="fs-5"><strong>Phone:</strong> {info.Address.Phone}</p>
                <p className="fs-5"><strong>Payment:</strong> {info.Address.Payment}</p>
            </div>
        </div>
    )
}

export default OrderCount;