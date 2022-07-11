
const PersonDisplay = ({person}) => {
    return (
        <div>
            <p key={person.id}>
                {person.name} {person.number} 
                <button>delete</button>
            </p>
        </div>
    )   
}

export default PersonDisplay