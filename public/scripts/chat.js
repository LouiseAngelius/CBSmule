import { io } from 'socket.io-client';
document.addEventListener('DOMContentLoaded', () => {
  const socket = io(); // This assumes the Socket.IO script is loaded and available

  const form = document.querySelector('form');
  const input = document.querySelector('#input');
  const messages = document.querySelector('#messages');

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (input.value) {
          socket.emit('chat message', input.value);
          input.value = '';
      }
  });

  socket.on('chat message', function(msg){
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li);
  });
});