let users = [],
    onlineUsers = [],
    offlineUsers = [],
    onlineSection = document.getElementById("online-users"),
    offlineSection = document.getElementById("offline-users"),
    onlineRight = document.getElementById("online-right"),
    onlineLeft = document.getElementById("online-left"),
    offlineRight = document.getElementById("offline-right"),
    offlineLeft = document.getElementById("offline-left");
    buttonList = [onlineRight, onlineLeft, offlineRight, offlineLeft];

async function getUsers() {
    const response = await fetch("https://randomuser.me/api/?results=50");
    users = await response.json();
    users = users.results;
    
    users.forEach(user => {
        if (user.gender == 'female') {
            onlineUsers.push(user);
        }
        else {
            offlineUsers.push(user);
        }
    });

    document.getElementById("online").innerHTML += ` (${onlineUsers.length})`;
    document.getElementById("offline").innerHTML += ` (${offlineUsers.length})`;
    renderUsers();
    
    let sliderPositionOnline = 0,
        sliderPositionOffline = 0,
        sliderCountOnline = Math.ceil(onlineUsers.length/9),
        sliderCountOffline = Math.ceil(offlineUsers.length/6);

    buttonList.forEach(button => {
        button.addEventListener("click", () => {
            if (button == onlineRight) {
                if (sliderPositionOnline == (sliderCountOnline-1)) {
                    sliderPositionOnline = 0;
                }
                else {
                    sliderPositionOnline++;
                }
                renderSlider('online', sliderPositionOnline, sliderCountOnline);
            }
            else if (button == onlineLeft) {
                if (sliderPositionOnline > 0) {
                    sliderPositionOnline--;
                }
                else {
                    sliderPositionOnline = (sliderCountOnline-1);
                }
                renderSlider('online', sliderPositionOnline, sliderCountOnline);
            }
            else if (button == offlineRight) {
                if (sliderPositionOffline == (sliderCountOffline-1)) {
                    sliderPositionOffline = 0;
                }
                else {
                    sliderPositionOffline++;
                }
                renderSlider('offline', sliderPositionOffline, sliderCountOffline);
            }
            else if (button == offlineLeft) {
                if (sliderPositionOffline > 0) {
                    sliderPositionOffline--;
                }
                else {
                    sliderPositionOffline = (sliderCountOffline-1);
                }
                renderSlider('offline', sliderPositionOffline, sliderCountOffline);
            }
        });
    });

};

function renderUsers() {
    onlineSection.querySelector(".overflow-content").innerHTML = ''
    offlineSection.querySelector(".overflow-content").innerHTML = ''

    onlineUsers.forEach(user => {
        onlineSection.querySelector(".overflow-content").innerHTML += `<div class="card-online">
                                                                            <img src="/assets/storage/avatar.svg" alt="user image">
                                                                            <p>${user.name.first}</p>
                                                                            <p>${user.email}</p>
                                                                            <span class="circle-online"></span>
                                                                        </div>`
    });

    offlineUsers.forEach(user => {
        offlineSection.querySelector(".overflow-content").innerHTML += `<div class="card-offline">
                                                                            <img src="/assets/storage/avatar.svg" alt="user image">
                                                                            <p>${user.name.first}</p>
                                                                            <p>${user.email}</p>
                                                                            <span class="circle-offline"></span>
                                                                        </div>`
    });
}

function renderSlider(name, position, step) {
    const overflowContent = name === 'online' ? onlineSection.querySelector(".overflow-content").scrollWidth : offlineSection.querySelector(".overflow-content").scrollWidth;
    let scrollIndex = position * (overflowContent / step+1);

    switch (name) {
        case 'online':
            onlineSection.querySelector(".overflow-content").style.transform = `translateX(-${scrollIndex}px)`;
            break;

        case 'offline':
            offlineSection.querySelector(".overflow-content").style.transform = `translateX(-${scrollIndex}px)`;
            break;
    }
}

setTimeout(() => {

    getUsers();

    onlineRight.style.opacity = 1;
    onlineLeft.style.opacity = 1;
    offlineRight.style.opacity = 1;
    offlineLeft.style.opacity = 1;
}, 2500);