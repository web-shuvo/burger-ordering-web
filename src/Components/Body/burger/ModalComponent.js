
let ModalComponent = (props) => {
    let item = props.items.map((val, id) => {
        return (
            <li key={id} > {val.type} - {val.amount} </li>
        )
    });

    return (
        <>
            <ul>
                {item}
            </ul>
        </>
    )
}


export default ModalComponent;