let loading = true,
    users = [],
    filterValue = 'abcdefghijklmnopqr'
    onlineSection = document.getElementById("online-users"),
    onlineUsers = [],
    offlineSection = document.getElementById("offline-users"),
    offlineUsers = [],

(async function getUsers() {
    const response = await fetch("https://randomuser.me/api/?results=50");
    users = await response.json();
    users = users.results;
    loading = false;
    
    users.forEach(user => {
        if (user.gender == 'female') {
            onlineUsers.push(user);
        }
        else {
            offlineUsers.push(user);
        }
    });

    renderUsers();
    // console.log(onlineSection);
})();

function renderUsers() {

    onlineUsers.forEach(user => {
        onlineSection.innerHTML += `<div class="card-online">
                                        <img src="/assets/storage/avatar.svg" alt="user image">
                                        <p>${user.name.first}</p>
                                        <p>${user.email}</p>
                                        <span class="circle-online"></span>
                                    </div>`
    });

    offlineUsers.forEach(user => {
        offlineSection.innerHTML += `<div class="card-offline">
                                        <img src="/assets/storage/avatar.svg" alt="user image">
                                        <p>${user.name.first}</p>
                                        <p>${user.email}</p>
                                        <span class="circle-offline"></span>
                                    </div>`
    });
}