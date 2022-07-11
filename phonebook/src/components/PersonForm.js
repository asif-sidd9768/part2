const PersonForm = (props) => {
    return(
        <form onSubmit={props.handleFormSubmit}>
            <div>name: <input value={props.value1} onChange={props.handleNameChange} /></div>
            <div>number: <input value={props.value2} onChange={props.handleNumberChange} /></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm