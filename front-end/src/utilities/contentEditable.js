/**
 * Created by dunghaqn's author on 05/05/2022
 * ---
 * Order an array of objects based on another array order
 * ---
*/
// onkey down
export const saveContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        e.target.blur()
    }
}
//select all input value when click
export const seclectAllInlineText= (e) => {
    e.target.focus()
    // e.target.select() or document.execCommand('selectAll', false, null)
    e.target.select()
}
