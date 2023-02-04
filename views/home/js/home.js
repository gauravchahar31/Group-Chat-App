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
    const messageBody = document.querySelector('#MessageBody');
    messages = JSON.stringify(messages);
    messageBody.innerHTML = messages;
})