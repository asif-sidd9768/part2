const Filter = ({filterNames, handleFilterChange}) => {
    return (
        <div>
            filter shown with <input value={filterNames} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter