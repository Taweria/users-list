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

let sliderPositionOnline = 1,
    sliderPositionOffline = 1,
    sliderCountOnline = onlineUsers.length/9,
    sliderCountOffline = offlineUsers.length/6,
    offsetValue = 200,
    onlineRight = document.getElementById("online-right"),
    onlineLeft = document.getElementById("online-left"),
    offlineRight = document.getElementById("offline-right"),
    offlineLeft = document.getElementById("offline-left");
    buttonList = [onlineRight, onlineLeft, offlineRight, offlineLeft];

buttonList.forEach(button => {
    button.addEventListener("click", () => {
        if (button == onlineRight) {
            sliderPositionOnline++;
            renderSlider('online', sliderPositionOnline);
        }
        else if (button == onlineLeft) {
            sliderPositionOnline--;
        }
        else if (button == offlineRight) {
            sliderPositionOffline++;
        }
        else if (button == offlineLeft) {
            sliderPositionOffline--;
        }
    });
});

function renderSlider(sliderName, sliderPosition) {
    switch (sliderName) {
        case 'online':
            
            let sliderContent = onlineSection.querySelectorAll(".card-online");
            sliderContent.forEach(card => {
                card.style.marginLeft = `-${sliderPosition * offsetValue}px`;
            });
            break;
        case 'offline':
            
            break;
    }
}
    