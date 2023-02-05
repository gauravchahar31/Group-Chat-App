const messageArray = [];
const messageForm = document.querySelector('#messageForm');

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageBox = document.querySelector('#userMessage');
    const saveMessage = await axios.post('/message/newMessage', {
        message : messageBox.value
    })
})

document.addEventListener('DOMContentLoaded', async () => {
    const localMessages = await getLocalStorageMessages();
    setInterval(() => {
        updateMessages();
    }, 1000)
})



async function updateMessages(){
    const lengthOfArray = messageArray.length;
    console.log(lengthOfArray);
    let lastMessage;
    if(lengthOfArray != 0){
        lastMessage = messageArray[lengthOfArray-1].id;
    }
    const newMessages = await axios.get(`/message/getMessages/${lastMessage}`);
    getMessagesOnScreen(newMessages.data);
    updateLocalStorageMessages(newMessages.data);
}


async function getMessagesOnScreen (newMessages){
    const tableBody = document.querySelector('.messageTableBody');
    newMessages.forEach((message) => {
        const tableRow = document.createElement('tr');
        const tableRowData = document.createElement('th')
        tableRowData.setAttribute('scope', 'row');
        tableRowData.innerHTML = `${message.name} : ${message.message}`
        tableBody.appendChild(tableRowData);
        tableBody.appendChild(tableRow);
    })
}

function getLocalStorageMessages(){
    if(localStorage.messages){
        return JSON.parse(localStorage.messages);
    }
}

function updateLocalStorageMessages(newMessages){
    const lengthOfnewMessages = newMessages.length;
    if(lengthOfnewMessages > 10){
        newMessages.splice(0, lengthOfnewMessages - 10);
        newMessages.forEach((message) => {
            messageArray.push(message);
        });
    }
    else{
        messageArray.splice(0, lengthOfnewMessages);
        newMessages.forEach((message) => {
            messageArray.push(message);
        });
    }
    localStorage.messages = JSON.stringify(messageArray);
}