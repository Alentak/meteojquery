//Main Form
document.querySelector('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let searchValue = document.querySelector('#search').value;

    window.location.href = `./weather.html?city=${searchValue}`;
});

//Nav form
document.querySelector('#navSearchForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let navSearchValue = document.querySelector('#navSearch').value;

    window.location.href = `./weather.html?city=${navSearchValue}`;
});