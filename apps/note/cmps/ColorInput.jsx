const { useState, useEffect } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function ColorInput({ note, onChangeStyle }) {
  const currColor = note.style.backgroundColor
  const colors = [
    { shade: '#faafa8', title: 'coral' },
    { shade: '#f39f76', title: 'Peach' },
    { shade: '#fff8b8', title: 'Sand' },
    { shade: '#e2f6d3', title: 'Mint' },
    { shade: '#b4ddd3', title: 'Sage' },
    { shade: '#d4e4ed', title: 'fog' },
    { shade: '#aeccdc', title: 'Storm' },
    { shade: '#f6e2dd', title: 'Dusk' },
    { shade: '#e9e3d4', title: 'Blossom' },
    { shade: '#efeff1', title: 'Clay' },
  ]

  const [changeColor, setChangeColor] = useState(false)

//   useEffect(() => {
//     listToClick()
//   },[changeColor])

  function onSetColor(color) {
    const style = { backgroundColor: color }
    onChangeStyle(style)
  }

  function listToClick() {
    const handleClick = (e) => {
        e.stopPropagation()
        console.log(e.target)
        setChangeColor(false)
        window.removeEventListener('click', handleClick)
    }

    // Add event listener
    window.addEventListener('click', handleClick)
}



  return (
    <React.Fragment>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setChangeColor((prev) => !prev)
          listToClick()
        }}
        className="change-color-btn btn"
      >
        <i className="fa-solid fa-palette"></i>
      </button>
      {changeColor && (
        <section className="color-input flex space-around">
          {colors.map((color) => (
            <div
              key={color.shade}
              className={`item ${color.shade === currColor ? 'selected' : ''}`}
              onClick={() => onSetColor(color.shade)}
              style={{ backgroundColor: color.shade }}
              title={color.title}
            ></div>
          ))}
        </section>
      )}
    </React.Fragment>
  )
}
