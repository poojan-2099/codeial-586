class chatEngine{
    constructor (chatBoxID,userEmail){
        this.chatBox=$(`#${chatBoxID}`);
        this.userEmail = userEmail;

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
            chatroom:'Comspace Express'
        });
        self.socket.on('user_joined', function(data)
        {
            console.log('A user has joined', data);
        });
    });
    }
}