/*
 * [Task description]
 * 
 *  getPath - поиск уникального селектора
 *  Написать алгоритм и функцию `getPath()`, находяющую уникальный css-селектор для элемента в документе.
 *  Уникальный селектор может быть использован `document.querySelector()` и возвращать исходный элемент.
 * `document.querySelectorAll()`, вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.
 *
 * ```javascript
 * $0 // HTMLElement
 * getPath($0) // => "..."
 * ```
 */

// ===== IMPLEMENTATION =====

// Gets the position of the node among its siblings inside the parent node.
// The position starts from 1.
// Returns 0 if the parent node is not present or has no children, or if the given node is the only child of its parent node.
const getPositionAmongSiblings = function (node) {
    
    const parentNode = node.parentElement;
    if (parentNode != null && parentNode.children != null && parentNode.children.length > 1) {
        let result = 1;
        for (child of parentNode.children) {
            if (child === node) {
                return result;
            }
            result++;
        }
    }

    return 0;
};

// Gets a CSS-selector of the given node inside its parent node.
// The result consists of the tag name of the given node and the :nth-child(...) selector
// if the given node is not the only child of its parent node.
const getSelectorInsideParentNode = function (node) {

    const selectorParts = [node.tagName];
    const positionAmongSiblings = getPositionAmongSiblings(node);
    if (positionAmongSiblings > 0) {
        selectorParts.push(`:nth-child(${positionAmongSiblings})`);
    }
    return selectorParts.join('');
};

// Gets a unique CSS-selector of the given element.
function getPath (element) {

    const waypoints = [];
    let node = element;
    do {
        const waypoint = getSelectorInsideParentNode(node);
        waypoints.push(waypoint);
        node = node.parentElement;
    } while (node !== null && node !== undefined);
    
    const path = waypoints.reverse().join(" > ");
    return path;
 };
