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