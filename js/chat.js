var Room = new Firebase('https://he3qd4b6s6e.firebaseio-demo.com/');

var Message = $("#message");
var Name = $("#name");
var messageList = $("#chat-messages");
var userList = $("#char-users");
var login = $("#login")

var Messages = Room.child("Messages");
var Users = Room.child("Users");
var UserList;

Message.keypress(function (e) 
{
    if (e.keyCode == 13) 
	{
		var username = Name.val();
		var message = Message.val();

 		Messages.push({name:username,message:message});
		Message.val('');
    }
});

Messages.limitToLast(10).on("child_added", function (snapshot)
{
	var data = snapshot.val();
    var name = data.name;
    var message = data.message;

    var messageElement = $("<li></li>");
    var nameElement = $("<strong></strong>")
    nameElement.text(name+"：");
    messageElement.text(message).prepend(nameElement);

    messageList.append(messageElement)

    $("#messages")[0].scrollTop = $("#messages")[0].scrollHeight;
});

function Login()
{
	for (var attr in UserList)
	{
		if (Name.val() === UserList[attr].name)
		{
			alert("用户已存在");
			return;
		}
	}
	Name.attr("disabled", true);
	Message.attr("disabled", false);
	login.attr("disabled", true);
	var username = Name.val();
	Users.push({name:username});
}

Users.on("value", function (data){
	UserList = data.val();
})

Users.on("child_added", function (snapshot)
{
	var data = snapshot.val();
    var name = data.name;

    var nameElement = $("<li></li>");
    nameElement.text(name);

    userList.append(nameElement);
});

function logout()
{
	for (var attr in UserList)
	{
		if (Name.val() === UserList[attr].name)
		{
			Users.child(attr).remove();
		}
	}
}

window.onunload = function()
{
	logout();
}