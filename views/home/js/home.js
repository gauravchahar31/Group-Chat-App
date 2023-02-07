const intervalArray = [];

//FETCH ALL JOINED GROUPS ON DOCUMENT LOAD
document.addEventListener('DOMContentLoaded', async (e) =>{
    let listOfGroups = await axios.get('/group/getUserGroups');
    listOfGroups = listOfGroups.data.chatGroups;
    listOfGroups.forEach(async group => {
        addGroupToSideBar(group);
    })
})

//FETCH ALL USERS ON MODAL OPENING
document.querySelector('#newGroupBtn').addEventListener('click', async () => {
    const usersSelect = document.querySelector('#groupUsers');
    usersSelect.innerHTML = '';
    let usersList = await axios.get('/user/getUsers');
    usersList = usersList.data;
    usersList.forEach(user => {
        const option = document.createElement('option');
        option.innerHTML = user.name;
        option.setAttribute('value', user.id);
        usersSelect.appendChild(option);
    });
})

//CREATE NEW GROUP
document.querySelector('#createGroupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const groupName = document.querySelector('#newGroupName').value;
    const groupUsers = [];
    for(let option of document.querySelector('#groupUsers').options){
        if(option.selected){
            groupUsers.push(parseInt(option.value));
        }
    }
    const createGroup = await axios.post('/group/createGroup', {
        name: groupName,
        users: groupUsers
    });
    addGroupToSideBar(createGroup.data);
})

//ADDS GROUPS TO THE SIDEBAR
async function addGroupToSideBar(group){
    const groupContainer = document.querySelector('.groupContainer');
    const userGroup = document.createElement('div');
    const groupName = document.createElement('h6');
    groupName.innerHTML = group.name;

    const lastMessage = document.createElement('p');
    lastMessage.setAttribute('class', 'text-muted');

    const lastMessageTime = document.createElement('p');
    lastMessageTime.setAttribute('class', 'time text-muted small');

    let groupData = await axios.get(`/message/lastMessage?groupId=${group.id}`);
    groupData = groupData.data;

    if(groupData.length >= 1){
        lastMessage.innerHTML = `${groupData[0].name} : ${groupData[0].message}`;
        lastMessageTime.innerHTML = `${groupData[0].createdAt}`;
    }else{
        lastMessage.innerHTML = `No Messages`;
        lastMessageTime.innerHTML = '00:00';
    }

    const partitionLine = document.createElement('hr');
    userGroup.appendChild(groupName);
    userGroup.appendChild(lastMessage);
    userGroup.appendChild(lastMessageTime);
    userGroup.appendChild(partitionLine);
    groupContainer.appendChild(userGroup);

    groupName.addEventListener('click', () => {
        for(let i=intervalArray.length-1; i>=0; i--){
            clearInterval(intervalArray[i]);
            intervalArray.pop();
        }
        showGroup(group.id, group.name);
    })
}

//DISPLAY GROUP NAME ON CLICK
async function showGroup(id, name){
    const groupChatHeader = document.querySelector('.groupChat');
    groupChatHeader.innerHTML = '';
    const groupNameH2 = document.createElement('h2');
    groupNameH2.innerHTML = name;
    if(true){
        const adminBtn = document.createElement('button');
        adminBtn.setAttribute('class', 'btn btn-primary');
        adminBtn.setAttribute('style', 'display: inline');
        adminBtn.innerHTML = 'Edit Group';
        groupNameH2.appendChild(adminBtn);
    }
    groupChatHeader.appendChild(groupNameH2);
    const horizontalLine = document.createElement('hr');
    groupChatHeader.appendChild(horizontalLine);
    document.querySelector('.welcomeMessage').setAttribute('style', 'display: none');
    const groupMessagesBox = document.querySelector('.groupMessagesBox');
    groupMessagesBox.innerHTML = '';
    createGroupChatScreen(id);
}

//SHOWS MESSAGE SCREEN
async function createGroupChatScreen(id){
    const chatPanel = document.querySelector('.chatPanel');
    chatPanel.setAttribute('style', 'margin-left: 10px; display: block;') 
    const formGroupId=  document.querySelector('#currentGroupId');
    formGroupId.value = id;
    const groupMessagesBox = document.querySelector('.groupMessagesBox');
    fetchMessages(id, groupMessagesBox);
}

document.querySelector('#sendMessage').addEventListener('click', async () => {
    const groupId = document.querySelector('#currentGroupId').value;
    const message = document.querySelector('#userMessage').value;
    await axios.post('/message/newGroupMessage', {
        message: message,
        chatGroupId: groupId
    })
    document.querySelector('#userMessage').innerHTML = '';
})

// FETCHES MESSAGES AND ADDS TO CHAT SCREEN
async function fetchMessages(id, groupMessagesBox){
    let messages = await axios.get(`/message/getGroupMessages/${id}`);
    const userId = messages.data.user;
    messages = messages.data.groupMessages;

    messages.forEach( message => {
        const row = document.createElement('div');
        row.setAttribute('class', 'row no-gutters');

        const col = document.createElement('div');
        const messageBody = document.createElement('div');

        if(message.UserId == userId){
            col.setAttribute('class', 'col-md-7 offset-md-9');
            messageBody.setAttribute('class', 'chat-bubble chat-bubble--right');
            messageBody.innerHTML = `<b>You</b> : ${message.message}`;
        }
        else{
            col.setAttribute('class','col-md-7');
            messageBody.setAttribute('class', 'chat-bubble chat-bubble--left');
            messageBody.innerHTML = `<b>${message.name}</b> : ${message.message}`;
        }
        
        row.appendChild(col);
        col.appendChild(messageBody);
        groupMessagesBox.appendChild(row);
    });

    let lastMessageId;
    if(messages[messages.length-1]){
        lastMessageId = messages[messages.length-1].id;
    }
    fetchNewMessages(id, lastMessageId, groupMessagesBox, userId);
    // const timeInterval = setInterval()
}

async function fetchNewMessages(id, lastMessageId, groupMessagesBox, userId){
    const interval = setInterval(() => {
        updateMessageList();
    }, 1000);
    intervalArray.push(interval);
    if(!lastMessageId){
        lastMessageId = 0;
    }
    async function updateMessageList(){
        let newMessages = await axios.get(`/message/getMessages?groupId=${id}&lastMessage=${lastMessageId}`);
        newMessages = newMessages.data;

        if(newMessages[0]){
            lastMessageId = newMessages[newMessages.length-1].id;
            await newMessages.forEach(message => {
                const row = document.createElement('div');
                row.setAttribute('class', 'row no-gutters');

                const col = document.createElement('div');
                const messageBody = document.createElement('div');

                if(message.UserId == userId){
                    col.setAttribute('class', 'col-md-7 offset-md-9');
                    messageBody.setAttribute('class', 'chat-bubble chat-bubble--right');
                    messageBody.innerHTML = `<b>You</b> : ${message.message}`;
                }
                else{
                    col.setAttribute('class','col-md-7');
                    messageBody.setAttribute('class', 'chat-bubble chat-bubble--left');
                    messageBody.innerHTML = `<b>${message.name}</b> : ${message.message}`;
                }
                
                row.appendChild(col);
                col.appendChild(messageBody);
                groupMessagesBox.appendChild(row);
            })
        }
    }
}