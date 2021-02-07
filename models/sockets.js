const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado.')

            // Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands() )

            //Votar por la banda
            this.io.on('votar-banda', (id) => {
                this.bandList.increaseVotes( id )
                //Emitir bandas actualizadas
                socket.emit('current-bands', this.bandList.getBands())
            })
        
        });
    }


}


module.exports = Sockets;