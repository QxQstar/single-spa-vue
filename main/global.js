
window.SLH_APP = {
    IS_INTEGRATION:true,
    routes:[],
    pub_event:{
        eventList:{},
        emitEvent(event_name,arge) {
            if(this.eventList[event_name]) {
                this.eventList[event_name].forEach(handler => {
                    if(handler) handler(arge);
                })
            }
        },
        addEevent(event_name,cb) {
            if(!this.eventList[event_name]) {
                this.eventList[event_name] = []
            };

            this.eventList[event_name].push(cb);
        }
    }
}
