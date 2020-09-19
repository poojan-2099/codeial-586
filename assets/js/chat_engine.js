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
            chatroom:'Apix express'
        });
        self.socket.on('user_joined', function(data)
        {
            console.log('A user has joined', data);
        });
    });  $('#send-message').click(function(event)
    {
        event.preventDefault();
        let message=$('#message').val();
        if(message!='')
        {
            $('#message').val('')
            self.socket.emit('send_message', {
                message:message,
                user_email:self.userEmail,
                user_avatar:self.user_avatar,
                chatroom:'Apix express'
            });
        }
    });

    self.socket.on('recieve_message', function(data)
    {
        console.log('Recieved some message!', data);
        let newMessage=$(`	<div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="${data.user_avatar}" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
        ${data.message}
            <span class="msg_time">8:40 AM, Today,${data.user_email}</span>
        </div>
    </div>`);
       
        if(data.user_email==self.userEmail)
        {
            newMessage=$(`<div class="d-flex justify-content-end mb-4">
            <div class="msg_cotainer_send">
               ${data.message}
                <span class="msg_time_send">8:55 AM, Today,${data.user_email}</span>
            </div>
            <div class="img_cont_msg">
        <img src="${data.user_avatar}" class="rounded-circle user_img_msg">
            </div>
        </div>`)
        }
        console.log(data.message)
        $('#ms_card_body').append(newMessage);
    })
    
    }
}