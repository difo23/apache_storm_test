var storm = require('node-storm')

var myspout = storm.spout(function(sync) {
    // For an unreliable emit:
    this.emit([fieldValue1, fieldValue2])

    // For a reliable emit:
    this.emit([fieldValue1, fieldValue2], {id: 'some unique id'})

    // Tell storm we're done emitting tuples for now
    sync()
})
.declareOutputFields(["field1", "field2"]) // declare output fields
.on('fail', function(data) {
    // Handle tuple failure
})
.on('ack', function(data) {
    // Handle tuple acknowledgement
})