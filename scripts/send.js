const id = prompt("Enter Peer ID");

const connected = new Peer();
connected.connect(id);
