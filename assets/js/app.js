/** Custom scripts */
function hideContentByLevel() {
    for(const element of document.querySelectorAll('[data-content-level]')) {
        const level = element.getAttribute('data-content-level')
        const userLevel = getContentLevel()
    
        if (userLevel && !level.includes(userLevel)) {
        element.style.display = "none";
        }
    }
}

hideContentByLevel()
