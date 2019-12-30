var modalForm = new ModalFormWindow("Testing", "Choose!", "yes", "no");

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
    client.sendMessage("Helloe and welcome to the MCBEMods proxy");
    modalForm.setTitle(modalForm.getTitle() + client.getAuthData().getDisplayName());
    client.showWindow(modalForm, 99990);
});

log.info(TransferPacket);

client.on("packet", function(pk) {
    if(pk instanceof SetLocalPlayerAsInitializedPacket) {
        log.info("sent 'hello' message");
        server.sendMessage("Hello");
    }
    return true;
});

client.on("command", function(command, args) {
    if(command == "test") {
        client.sendMessage("Testing");
        return false;
    }else if(command == "modal") {
        client.showWindow(modalForm, 99990);
        return false;
    }
    return true;
});

server.on("message", function(message) {
    log.info("[CHAT]: " + message);
    //client.sendMessage(message);
    return true;
});

// FORMS
client.on("formResponse", function(id, response) {
    if(response != null) {
        if(id == 99990) {
            client.sendMessage(response);

            modalForm.setResponse(response);
            client.sendMessage(modalForm.getResponse().getClickedButtonText());
            return false;
        }
    }
    return true;
});
