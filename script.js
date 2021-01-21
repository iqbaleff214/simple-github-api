const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async function () {
    spinnerToggle();
    const inputValue = document.querySelector('input[type=text]');
    const users = await getUsers(inputValue.value || "a");
    updateUI(users);
});

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('show-detail-button')) {
        const login = e.target.dataset.login;
        const user = await getUser(login);
        updateUIDetail(user);
    }
});

const apiUrlSearch = key => `https://api.github.com/search/users?q=${key}&per_page=10`;

const apiUrlGet = key => `https://api.github.com/users/${key}`;

const getUser = login => fetch(apiUrlGet(login)).then(res => res.json()).then(res => res);

const getUsers = key => fetch(apiUrlSearch(key)).then(response => response.json()).then(response => response.items).finally(() => spinnerToggle());

const updateUI = users => {
    const movieContainer = document.querySelector('.movie-container');
    let cards = '';
    users.forEach(user => cards += showCard(user));
    movieContainer.innerHTML = cards;
};

const modalContainer = document.querySelector('.modal-content');
const updateUIDetail = user => modalContainer.innerHTML = showDetail(user);

const spinner = document.querySelector('.spinner-border');
const spinnerToggle = () => spinner.style.display = spinner.style.display == "none" ? "inline-block" : "none";

const showCard = user => `
    <div class="col-md-3 col-sm-4 my-3">
        <div class="card">
            <img src="${user.avatar_url}" class="card-img" alt="...">
            <div class="card-img-overlay">
                <h5 class="card-title"><span class="badge bg-primary">${user.login}</span></h5>
                <button type="button" class="btn btn-primary btn-sm position-absolute bottom-0 end-0 m-3 show-detail-button" data-bs-toggle="modal"
                    data-bs-target="#showUserDetail" data-login="${user.login}">
                    Show Detail
                </button>
            </div>
        </div>
    </div>
`;

const showDetail = user => `
        <div class="modal-header">
                <h5 class="modal-title" id="showUserDetailLabel">GitHub User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="${user.avatar_url}"
                    class="img-thumbnail rounded-circle mx-auto my-3 d-block" alt="${user.login}" style="width: 250px;">
                <table class="table">
                    <tr>
                        <th>Name</th>
                        <td>${user.name}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>${user.login}</td>
                    </tr>
                    <tr>
                        <th>Followers</th>
                        <td>${user.followers}</td>
                    </tr>
                    <tr>
                        <th>Following</th>
                        <td>${user.following}</td>
                    </tr>
                </table>
            </div>
`;

spinnerToggle();