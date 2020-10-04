var softcap_data = {
	dt_log: {
		1: {
			func: "pow",
			start: 4e3,
			pow: 0.6,
			derv: true
		},
		2: {
			func: "pow",
			start: 5e3,
			pow: 0.4,
			derv: true
		},
		3: {
			func: "pow",
			start: 6e3,
			pow: 0.2,
			derv: true
		}
	},
	ts_reduce_log: {
		1: {
			func: "pow",
			start: 1e6,
			pow: 0.75,
			derv: false
		},
		2: {
			func: "pow",
			start: 2e6,
			pow: 0.7,
			derv: false
		},
		3: {
			func: "pow",
			start: 3e6,
			pow: 0.65,
			derv: false
		},
		4: {
			func: "pow",
			start: 4e6,
			pow: 0.6,
			derv: false
		},
		5: {
			func: "pow",
			start: 5e6,
			pow: 0.55,
			derv: false
		}
	},
	ts_reduce_log_big_rip: {
		1: {
			func: "pow",
			start: 1e4,
			pow: 0.75,
			derv: false
		},
		2: {
			func: "pow",
			start: 2e4,
			pow: 0.65,
			derv: false
		}
	},
	ts11_log_big_rip: {
		1: {
			func: "pow",
			start: 11e4,
			pow: 0.8,
			derv: true
		},
		2: {
			func: "pow",
			start: 13e4,
			pow: 0.7,
			derv: true
		},
		3: {
			func: "pow",
			start: 15e4,
			pow: 0.6,
			derv: true
		},
		4: {
			func: "pow",
			start: 17e4,
			pow: 0.5,
			derv: true
		},
		5: {
			func: "pow",
			start: 19e4,
			pow: 0.4,
			derv: true
		},
		6: {
			func: "pow",
			start: 2e5,
			pow: .9,
			derv: false
		},
		7: {
			func: "pow",
			start: 3e5,
			pow: .8,
			derv: false
		}
	},
	ms322_log: {
		1: {
			func: "pow",
			start: 500,
			pow: 0.75,
			derv: true
		}
	},
	bru1_log: {
		1: {
			func: "pow",
			start: 3e8,
			pow: 0.75,
			derv: false
		},
		2: {
			func: "log",
			start: 1e10,
			pow: 10
		},
		3: {
			func: "pow",
			start: 2e10,
			pow: 0.5,
			derv: true
		},
		4: {
			func: "pow",
			start: 4e10,
			pow: 0.7,
			derv: true
		},
		5: {
			func: "log",
			start: 1e11,
			pow: 11,
			add: -1
		}
	},
	beu3_log: {
		1: {
			func: "pow",
			start: 150,
			pow: 0.5,
			derv: false
		}
	},
	inf_time_log_1: {
		1: {
			func: "pow",
			start: 12e4,
			pow: 0.5,
			derv: false
		},
		2: {
			func: "pow",
			start: 12e6,
			pow: 2/3,
			derv: false
		}
	},
	inf_time_log_1_big_rip: {
		1: {
			func: "pow",
			start: 100,
			pow: 0.5,
			derv: false
		},
		2: {
			func: "pow",
			start: 1e4,
			pow: 0.4,
			derv: false
		},
		3: {
			func: "pow",
			start: 2e4,
			pow: .7,
			derv: true
		}
	},
	inf_time_log_2: {
		1: {
			func: "pow",
			start: 12e7,
			pow: 0.6,
			derv: false
		},
		2: {
			func: "pow",
			start: 16e7,
			pow: 0.5,
			derv: false
		},
		3: {
			func: "pow",
			start: 20e7,
			pow: 0.4,
			derv: false
		}
	},
	ig_log_high: { // this never gets above e15 in my e71 Qt Ng+3^ save so remove this?
		1: { 
			func: "log",
			start: 1e20,
			pow: 10,
			mul: 5
		},
		2: { 
			func: "log", 
			start: 1e22,
			pow: 11,
			mul: 4,
			add: 12
		},
		3: {
			func: "pow",
			start: 1e23,
			pow: 0.1,
			derv: false
		}
	},
	bam: {
		1: {
			func: "pow",
			start: new Decimal(1e80),
			pow: 0.9,
			derv: true
		},
		2: {
			func: "pow",
			start: new Decimal(1e90),
			pow: 0.8,
			derv: true
		},
		3: {
			func: "pow",
			start: new Decimal(1e100),
			pow: 0.7,
			derv: true
		},
		4: {
			func: "pow",
			start: new Decimal(1e110),
			pow: 0.6,
			derv: true
		},
		5: {
			func: "pow",
			start: new Decimal(1e120),
			pow: 0.5,
			derv: true
		},
		6: {
			func: "pow",
			start: new Decimal(1e130),
			pow: 0.4,
			derv: true
		}
	},
	idbase: {
		1: {
			func: "pow",
			start: 1e14,
			pow: .90,
			derv: true
		},
		2: {
			func: "pow",
			start: 1e15,
			pow: .85,
			derv: true
		},
		3: {
			func: "pow",
			start: 3e15,
			pow: .80,
			derv: true
		},
		4: {
			func: "pow",
			start: 1e16,
			pow: .75,
			derv: true
		},
		5: {
			func: "pow",
			start: 3e16,
			pow: .70,
			derv: true
		},
		6: {
			func: "pow",
			start: 1e17,
			pow: .65,
			derv: true
		}
	},
	working_ts: {
		1: {
			func: "pow",
			start: 1e15,
			pow: .9,
			derv: true
		},
		2: {
			func: "pow",
			start: 1e16,
			pow: .85,
			derv: true
		},
		3: {
			func: "pow",
			start: 1e17,
			pow: .8,
			derv: true
		}
	},
	bu45: {
		1: {
			func: "pow",
			start: 9,
			pow: .5,
			derv: false
		},
		2: {
			func: "pow",
			start: 25,
			pow: .5,
			derv: false
		},
		3: {
			func: "pow",
			start: 49,
			pow: .5,
			derv: false
		},
		4: {
			func: "pow",
			start: 81,
			pow: .5,
			derv: false
		},
		5: {
			func: "pow",
			start: 121,
			pow: .5,
			derv: false
		},
		6: {
			func: "pow",
			start: 169,
			pow: .5,
			derv: false
		},
		7: {
			func: "pow",
			start: 225,
			pow: .5,
			derv: false
		}
	},
	EPtoQK: {
		1: {
			func: "pow",
			start: 1e3,
			pow: .8,
			derv: true
		},
		2: {
			func: "pow",
			start: 3e3,
			pow: .7,
			derv: true
		},
		3: {
			func: "pow",
			start: 1e4,
			pow: .6,
			derv: true
		},
		4: {
			func: "pow",
			start: 3e4,
			pow: .5,
			derv: true
		}
	},
	qc3reward: {
		1: {
			func: "pow",
			start: 1331,
			pow: .5,
			derv: false
		}, 
		2: {
			func: "log",
			start: 4096,
			mul: 4 / Math.log10(8), /* log2(4096)=12, so 4/3s that is 16 and 16**3 = 4096 */
			pow: 3
		}
	},

	//NG Condensed
	nds_ngC: {
		1: {
			func: "pow",
			start: 1e50,
			pow: 1/3,
			derv: false,
		},
		2: {
			func: "pow",
			start: new Decimal(Number.MAX_VALUE),
			pow: 1/4,
			derv: false,
		},
		3: {
			func: "pow",
			start: new Decimal("1e10000"),
			pow: 1/7,
			derv: false,
		}
	},
	ts_ngC: {
		1: {
			func: "pow",
			start: Number.MAX_VALUE,
			pow() {
				return player.challenges.includes("postcngc_2") ? 2/5 : 1/3
			},
			derv: false,
		},
		2: {
			func: "pow",
			start: new Decimal("1e1000"),
			pow() {
				return player.challenges.includes("postcngc_2") ? 13/40 : 1/4
			},
			derv: false,
		},
	},
	sac_ngC: {
		1: {
			func: "pow",
			start: 1e25,
			pow: 1/3,
			derv: false,
		},
		2: {
			func: "pow",
			start: new Decimal(Number.MAX_VALUE),
			pow: 1/4,
			derv: false,
		},
	},
	ip_ngC: {
		1: {
			func: "pow",
			start: 1e10,
			pow() {
				return player.challenges.includes("postc6") ? .875 : .5
			},
			derv: false,
		},
		2: {
			func: "pow",
			start: 1e30,
			pow() {
				return player.challenges.includes("postc6") ? 5/6 : 1/3
			},
			derv: false,
		},
	},
	rep_ngC: {
		1: {
			func: "pow",
			start: 1e6,
			pow: 1/2,
			derv: false,
		},
		2: {
			func: "log",
			start: 1e9,
			mul: Math.sqrt(1e9) / 9,
			pow: 2,
		},
	},
	ep_ngC: {
		1: {
			func: "pow",
			start: 1e10,
			pow: 1/2,
			derv: false,
		},
		2: {
			func: "pow",
			start: new Decimal(Number.MAX_VALUE),
			pow: 1/3,
			derv: false,
		},
	},
}

var softcap_vars = {
	pow: ["start", "pow", "derv"],
	log: ["pow", "mul", "add"],
	logshift: ["shift", "pow", "add"]
}

var softcap_funcs = {
	pow(x, start, pow, derv = false) {
		x = Math.pow(x / start, pow)
		if (derv) x = (x - 1) / pow + 1
		x *= start
		return x
	},
	pow_decimal(x, start, pow, derv = false) {
		x = Decimal.div(x, start).pow(pow)
		if (derv) x = x.sub(1).div(pow).add(1)
		x = x.times(start)
		return x
	},
	log(x, pow = 1, mul = 1, add = 0) {
		var x2 = Math.pow(Math.log10(x) * mul + add, pow)
		return Math.min(x, x2)
	},
	log_decimal(x, pow = 1, mul = 1, add = 0) { 
		//dont we want to return a Decimal since x is a Decimal
		var x2 = Decimal.pow(x.log10() * mul + add, pow)
		return Decimal.min(x, x2)
	},
	logshift: function (x, shift, pow, add = 0){
		var x2 = Math.pow(Math.log10(x * shift), pow) + add
		return Math.min(x, x2)
	}
}

function do_softcap(x, data, num) {
	var data = data[num]
	if (data === undefined) return

	var func = data.func
	var vars = softcap_vars[func]

	var v = [data[vars[0]], data[vars[1]], data[vars[2]]]
	for (let i = 0; i < 3; i++) if (typeof v[i] == "function") v[i] = v[i]()

	var decimal = false
	var canSoftcap = false
	if (x.l != undefined || x.e != undefined) decimal = true
	if (decimal ? x.gt(data["start"]) : x > data["start"]) canSoftcap = true

	if (canSoftcap) return softcap_funcs[func + (decimal ? "_decimal" : "")](x, v[0], v[1], v[2])
	return x
}

function softcap(x, id, max = 1/0) {
	var data = softcap_data[id]
	if (tmp.ngp3 && tmp.qu.bigRip.active) {
		var big_rip_data = softcap_data[id + "_big_rip"]
		if (big_rip_data !== undefined) data = big_rip_data
	}

	var sc = 1
	var stopped = false
	while (!stopped && sc <= max) {
		var y = do_softcap(x, data, sc)
		if (y !== undefined) {
			x = y
			sc++
		} else stopped = true
	}
	return x
}
