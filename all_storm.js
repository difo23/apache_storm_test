var storm = require('node-storm')

console.log("creo el bolt")
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


console.log("Creo esl spout")
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

console.log("creo la topology")

var builder = storm.topologybuilder()
builder.setSpout('spoutid', myspout)
builder.setBolt('boltid', mybolt, 8).shuffleGrouping('spoutid')
var topology = builder.createTopology()


console.log("trato de enviar la topology")
var options = {
    // name: 'optional... the default name is the name of the topology script',
    nimbus: '10.10.11.42:6627',
    config: { 'topology.debug': true }
}
storm.submit(topology, options, function(err, topologyName) {
    // Handle error or submission success
    console.dir(topologyName)
    console.log("topolgi enviada")
    console.dir(err)
})

console.log("Detengo el script")