const template = document.querySelector('.template');

const renderParrot = function (parrot) {
    const {
        id,
        title,
        img,
        price,
        birthDate,
        sizes,
        isFavourite,
        features,
    } = parrot;

    const parrotRow = template.content.cloneNode(true);
    
    const parrotImg = parrotRow.querySelector(`.parrots__img`);
    parrotImg.src = img;
    parrotRow.querySelector('.parrots__title').textContent = title;
    parrotRow.querySelector('.parrots__mark').textContent = price;
    parrotRow.querySelector('.parrots__date').textContent = birthDate;
    parrotRow.querySelector('.parrots__subtitle').textContent = `${sizes.width} width x ${sizes.height} height`;
    parrotRow.querySelector('.list-unstyled').textContent = features
    
    
    const parrotsEditBtn = parrotRow.querySelector('.parrots__edit-btn')
    
    const parrotsDeleteBtn = parrotRow.querySelector('.parrots__del-btn')
    
    return parrotRow
}


let showParrots = products.slice()

const parrotsTable = document.querySelector('.parrots')
const parrotsTableBody = parrotsTable.querySelector('.col-6');
const elCount = document.querySelector('.count');

const renderParrots = function () {
    
    parrotsTable.innerHTML = "";
    
    elCount.textContent = `Count: ${showParrots.length}`
    
    const parrotFragment = document.createDocumentFragment()
    showParrots.forEach((parrot) => {
        const parrotRow = renderParrot(parrot);
        parrotFragment.append(parrotRow)
    })
    parrotsTable.append(parrotFragment)
}

renderParrots()


const addForm = document.querySelector("#add-form");
const addParrotModalEl = document.querySelector("#add-parrot-modal");
const addParrotModal = new bootstrap.Modal(addParrotModalEl);

addForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    
    const elements = evt.target.elements
    
    const titleValue = elements.title.value
    const imgValue = elements.img.value
    const priceValue = elements.price.value
    const dateValue = elements.date.value
    const widthValue = elements.width.value
    const heightValue = elements.height.value
    const featuresValue = elements.features.value
    
    if (titleValue.trim() && imgValue.trim() && priceValue.trim() && dateValue.trim() && widthValue.trim() && heightValue.trim() && featuresValue.trim()) {
        const parrot = {
            title: titleValue,
            img:String(imgValue),
            price:priceValue,
            birthDate: dateValue,
            sizes: {
                width: widthValue,
                height: heightValue
            },
            features: featuresValue,
        }
        
        products.push(parrot)
        localStorage.setItem('products', JSON.stringify(products))
        showParrots.push(parrot)
        
        addForm.reset()
        addParrotModal.hide()
        
        renderParrots()
    }
})

