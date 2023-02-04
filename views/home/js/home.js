const messageForm = document.querySelector('#messageForm');

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.querySelector('#userMessage').value;
    console.log(message);
    const saveMessage = await axios.post('/message/newMessage', {
        message : message
    });
    console.log(saveMessage);
})

document.addEventListener('DOMContentLoaded', async () => {
    let messages = await axios.get('/message/getMessages');
    const tableBody = document.querySelector('.messageTableBody');
    const listOfMessages = messages.data;
    listOfMessages.forEach((message) => {
        const tableRow = document.createElement('tr');
        const tableRowData = document.createElement('th')
        tableRowData.setAttribute('scope', 'row');
        tableRowData.innerHTML = `${message.name} : ${message.message}`
        tableBody.appendChild(tableRowData);
        tableBody.appendChild(tableRow);
    })
})