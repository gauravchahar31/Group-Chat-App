const messageForm = document.querySelector('#messageForm');

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageBox = document.querySelector('#userMessage');
    const saveMessage = await axios.post('/message/newMessage', {
        message : messageBox.value
    });
    messageBox.value = '';
})

document.addEventListener('DOMContentLoaded', () => {
   setInterval(() => {
    getMessagesOnScreen();
}, 1000)
})

async function getMessagesOnScreen (){
    let messages = await axios.get('/message/getMessages');
    const tableBody = document.querySelector('.messageTableBody');
    tableBody.innerHTML = '';
    const listOfMessages = messages.data;
    listOfMessages.forEach((message) => {
        const tableRow = document.createElement('tr');
        const tableRowData = document.createElement('th')
        tableRowData.setAttribute('scope', 'row');
        tableRowData.innerHTML = `${message.name} : ${message.message}`
        tableBody.appendChild(tableRowData);
        tableBody.appendChild(tableRow);
    })
}