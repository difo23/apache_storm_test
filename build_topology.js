var storm = require('node-storm')
const myspout = require('storm_spout')
const mybolt = require('storm_bolt')

var builder = storm.topologybuilder()
builder.setSpout('spoutid', myspout)
builder.setBolt('boltid', mybolt, 8).shuffleGrouping('spoutid')
var topology = builder.createTopology()