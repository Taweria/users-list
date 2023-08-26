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

})();

function renderUsers() {
    
}