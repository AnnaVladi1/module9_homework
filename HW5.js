const btn = document.querySelector('button'),
    error = document.querySelector('.error');


function checkInteger(number) {
  return Number.isInteger(number)
}

function setImages(data) {
    let imageHolder = document.getElementById('photo_holder');
    imageHolder.innerHTML = '';
    Array.from(data).map(el => {
        let image = document.createElement('img');
        image.src = el.download_url;
        image.alt = el.autor;
        imageHolder.append(image);
    })
}
function checkValues(inputs) {
    let arr = [];
    Array.from(inputs).map(input => {
        let value = input.value;
            arr.push((value < 1 || value > 10) && !checkInteger(value))
    })
    if(!arr[0] && !arr[1]) {
        return true;
    } else if (arr[0] && arr[1]) {
        error.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
    } else if(arr[0] && !arr[1]) {
        error.textContent = 'Номер страницы вне диапазона от 1 до 10';
    } else if(!arr[0] && arr[1]) {
        error.textContent = 'Лимит вне диапазона от 1 до 10';
    }
    return false;

}
btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input');
    let val = checkValues(inputs);

    if(val) {
        error.classList.remove('active');
        fetch(`https://picsum.photos/v2/list?page=${inputs[0].value}&limit=${inputs[1].value}`)
            .then((response) => { return response.json() })
            .then((data) => {
                localStorage.setItem('Images', JSON.stringify(data))
                setImages(data);
            })
            .catch((e) => { console.log(e) });
    } else {
        error.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let images = localStorage.getItem('Images');
    if(images) {
        setImages(JSON.parse(images))
    }
})