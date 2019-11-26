var ClientSidedTextPacket = requirePacket("client", "TextPacket");
var ServerSidedTextPacket = requirePacket("server", "TextPacket");

var textPk = new ClientSidedTextPacket();
textPk.setMessage("f");

/*
Equivalent of:
client.on("packet", function(pk) {
	if(pk instanceof SetLocalPlayerAsInitializedPacket) {
		// do something
	}
	return true;
});
*/
client.on("connected", function() {
	client.sendPacket(textPk);
});

client.on("packet", function(pk) {
	if(pk instanceof SetLocalPlayerAsInitializedPacket) {
		// do something
		server.sendMessage("Hello, I'm using a example mod");
	}
	return true;
});

client.on("command", function(command, args) {
	client.sendMessage(command);
	return true;
});

server.on("message", function(message) {
	client.sendMessage(message);
	return false;
});