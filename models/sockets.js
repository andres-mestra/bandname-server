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
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes( id )
                //Emitir bandas actualizadas
                this.io.emit('current-bands', this.bandList.getBands())
            })
            
            //Borrar banda
            socket.on('delete-banda', (id) => {
                this.bandList.removeBand(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            //Cambiar nombre de banda
            socket.on('new-banda', ({ name }) => {
                this.bandList.addBand( name )
                this.io.emit('current-bands', this.bandList.getBands())
            })
            
            //Crear banda
            socket.on('change-name-banda', ({ id, name }) => {
                this.bandList.changeName(id, name)
                this.io.emit('current-bands', this.bandList.getBands())
            })
        
        });
    }


}


module.exports = Sockets;