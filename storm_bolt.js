var storm = require('node-storm')

var mybolt = storm.bolt(function(data) {
    // Emit some stuff
    this.emit([fieldValue1])

    // Anchoring
    this.emit([fieldValue1], {anchors: [data.id]})

    // Emit direct
    this.emit([fieldValue1], {stream: "streamid", task: 9})

    // Retrieving the task(s) a tuple was sent to
    this.emit([fieldValue1]).then(function(tasks) {
        // tasks is an array of task ids
    })

    // Log a message
    this.log('something interesting happened')

    // Acknowledge the tuple
    this.ack(data)

    // Or fail the tuple
    this.fail(data)
})
.declareOutputFields(["field1"])              // declare output fields
.declareStream("streamid", false, ["field1"]) // optionally declare another output stream