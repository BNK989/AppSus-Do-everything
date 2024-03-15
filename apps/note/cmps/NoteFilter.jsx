const { useState, useEffect } = React

import {debounce}  from '../../../services/util.service.js'

export function NoteFilter({ filterBy, onSetFilter }){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	const onFilter = (ev) => {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

    const handleChange = ({ target }) => {
    let { value, name: field, type } = target

    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    debounce(() => onSetFilter(filterByToEdit), 500)
    }

    return (
        <div>
            <h5>Search</h5>
            <form onSubmit={onFilter}>
			<label htmlFor="text">Text</label>
			<input type="search"
				id="text"
				name="txt"
				value={filterByToEdit.txt}
				onChange={handleChange}
				placeholder="By text" />

			<button>Filter</button>
		</form>
        </div>
    )
}