const btn = document.querySelector('button');
const div = document.querySelector('.error');

const request = (value) => {

    let xhr = new XMLHttpRequest();


    xhr.open('GET', `https://picsum.photos/v2/list?limit=${value}`);


    xhr.onload = function (e) {
        if (xhr.status !== 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            let imageHolder = document.getElementById('photo_holder'),
                data = JSON.parse(xhr.response);
            imageHolder.innerHTML = '';
            Array.from(data).map(el => {
                let image = document.createElement('img');
                image.src = el.download_url;
                image.alt = el.autor;
                imageHolder.append(image);
            })

        }
    };


    xhr.onerror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
}
btn.addEventListener('click', () => {
    const inp = document.querySelector('input').value;
    if (inp > 10 || inp < 1) {
        div.classList.add('active');
        return false;
    } else {
        div.classList.remove('active');
        request(inp);
    }

});