const handlerChange = (event, temperaments, setInputValue, newDog) => {
    removeAutocomplete();
    
    const value = event.target.value.toLowerCase();

    if (value.length === 0) return;
    const filteredTemp = [];
    temperaments.forEach((temperament) => {
        if (temperament.substr(0, event.target.value.length).toLowerCase() === value) {
            filteredTemp.push(temperament)
        }
    });
    createAutocomplete(filteredTemp, setInputValue, newDog);
}

const createAutocomplete = (list, setInputValue, newDog) => {
    const listEl = document.createElement('ul');
    listEl.className = "autocomplete-list";
    listEl.id = "autocomplete-list";

    list.forEach((temperament)=> {
        const listItem = document.createElement("li");
        const tempButton = document.createElement("button")
        tempButton.innerHTML = temperament;
        tempButton.addEventListener("click", (event) => temperamentButtonClick(event, setInputValue, newDog));
        listItem.appendChild(tempButton);
        listEl.appendChild(listItem)
    })
    document.querySelector("#autocomplete-wrapper").appendChild(listEl);
}

const removeAutocomplete = () => {
    const listEl = document.querySelector("#autocomplete-list");
    if (listEl) listEl.remove();
}


const temperamentButtonClick = (event, setInputValue, newDog) => {
    event.preventDefault();
    const buttonEl = event.target;
    const inputEl = document.querySelector('#autocomplete-input')
    inputEl.value = buttonEl.innerHTML;
    removeAutocomplete();
    if (newDog) {
        setInputValue({...newDog, temperamentButton: buttonEl.innerHTML})
    }else{
        setInputValue(buttonEl.innerHTML);
    }
}

export default handlerChange;