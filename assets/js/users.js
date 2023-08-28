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

    document.getElementById("online").innerHTML += ` (${onlineUsers.length})`;
    document.getElementById("offline").innerHTML += ` (${offlineUsers.length})`;
    renderUsers();
    // console.log(onlineSection);
})();

function renderUsers() {

    onlineUsers.forEach(user => {
        onlineSection.innerHTML += `<div class="card-online">
                                        <p>${onlineUsers.indexOf(user)}</p>
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
    sliderCountOnline = Math.ceil(onlineUsers.length/9),
    sliderCountOffline = Math.ceil(offlineUsers.length/6),

    offsetValue = 2000,
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
            renderSlider('online', sliderPositionOnline);
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
            
            let sliderContent = onlineSection.querySelectorAll(".card-online"),
                movedElement  = 3;
            // sliderContent.forEach(card => {
            //     card.style.marginLeft = `-${sliderPosition * offsetValue}px`;
            // });

            if (sliderPosition < sliderCountOnline) {
                movedElement = sliderPosition * 3;
            }

            for (let i=0; i<movedElement; i++){
                sliderContent[i].style.marginLeft = `-${sliderPosition * offsetValue}px`;
            }
        break;

        case 'offline':
            
        break;
    }
}