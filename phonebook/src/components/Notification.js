const Notification = ({data}) => {
    console.log(data);
    if(data === null ){
        return null
    }
    return (
        <div className={data.class}>
            {data.message}
        </div>
    )
}

export default Notification