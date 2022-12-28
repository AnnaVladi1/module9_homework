const btn = document.querySelector('button');
const div = document.querySelector('.error');

function checkValues(inputs) {
    Array.from(inputs).map(input => {
        let value = input.value;
        if (value < 100 || value > 300) {
            div.classList.add('active');
            return false;
        }
    })
    div.classList.remove('active');
    return true;
}
btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input');
    let val = checkValues(inputs);
    if(val) {
        fetch(`https://picsum.photos/${inputs[0].value}/${inputs[1].value}`)
            .then((response) => { return response })
            .then((data) => {
                let imageHolder = document.getElementById('photo_holder');
                imageHolder.innerHTML = '';
                let image = document.createElement('img');
                image.src = data.url;
                image.alt = 'pic';
                imageHolder.append(image);
            })
            .catch((e) => { console.log(e) });
    }
});