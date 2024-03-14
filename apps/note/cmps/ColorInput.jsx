const { useState } = React

export function ColorInput({ note, onChangeStyle }) {

    const currColor = note.style.backgroundColor
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']
    
    const [changeColor, setChangeColor] = useState(false)

    function onSetColor(color) {
        const style = { backgroundColor: color }
        onChangeStyle(style)
    }

    return <React.Fragment>
        <button onClick={(e) => {e.stopPropagation();setChangeColor(prev => !prev)}} className="change-color-btn btn">Color</button>
        {changeColor && 
        <section className="color-input flex space-around">
            {
                colors.map(color => <div key={color}
                    className={`item  + ${color === currColor ? 'selected' : ''}`}
                    onClick={() => onSetColor(color)}
                    style={{ backgroundColor: color }}
                ></div>)
            }
    </section>}
    </React.Fragment>

}