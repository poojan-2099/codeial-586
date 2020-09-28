
class chatEngine{
    constructor (chatBoxID,userEmail,user_avatar){
        this.chatBox=$(`#${chatBoxID}`);
        this.userEmail = userEmail;
        this.user_avatar=user_avatar;

        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler (){
        let self = this;
        this.socket.on('connect',function(){
            console.log('connection established using socket');
             self.socket.emit('join_room', 
        {
            user_email:self.userEmail,
            ChatRoomId:'Apix express'
        });
            self.socket.on('user_joined', function(data)
            {
                console.log('A user has joined', data);
            });
    });
      $('#send-message').click(function(event)
    {
        event.preventDefault();
        let message=$('#inputText').val();
        if(message!='')
        {
            $('#inputText').val('')
            self.socket.emit('send_message', {
                message:message,
                user_email:self.userEmail,
                user_avatar:self.user_avatar,
                ChatRoomId:'Apix express'
            });
        }
    });

        self.socket.on('recieve_message', function(data)
        {
            
            console.log('Recieved some message!', data);
            let newMessage=$(`	  <div class="message message-left">
            <div class="avatar-wrapper avatar-small">
              <img class="chatimg"src="${data.user_avatar}" alt="avatar" />
            </div>
            <div class="bubble bubble-light">
            ${data.message}
            </div>
          </div>`);
           
            if(data.user_email==self.userEmail)
            {
                newMessage=$(`<div class="message message-right">
                <div class="avatar-wrapper avatar-small">
                  <img class="chatimg" src=${data.user_avatar} alt="avatar" />
                </div>
                <div class="bubble bubble-dark">
                ${data.message}
                </div>
              </div>`)
            }
            console.log(data.message,'brother')
            $('.chat-room').append(newMessage);
        })
      
          $('#inputText').on('keydown',function(e){
              self.socket.emit('typing', { typing:true});
          });
      
          $('#inputText').on('keyup',function(e){
              setTimeout(() => {     
                   self.socket.emit('typing', { typing:false})
               }, 2000);
          });
       
        self.socket.on('display', (data)=>{
            if(data.typing==true){
            $('#feedback').text(` typing...`)
            }
            else{
            $('#feedback').text("")
            }
        })

  
    
    }
}