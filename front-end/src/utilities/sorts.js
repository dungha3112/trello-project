/**
 * Created by dunghaqn's author on 04/28/2022
 * ---
 * Order an array of objects based on another array order
 * ---
*/
export const mapOrder = (array, order, key) => {
    array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return array
}