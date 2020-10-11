var softcap_data = {
	dt_log: {
		name: "log base 10 of dilated time gain per second",
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
		name: "log base 10 of tickspeed reduction",
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
		name: "log base 10 of tickspeed reduction in Big Rip",
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
		name: "log base 10 of time study 11 effect in Big Rip",
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
		name: "log base 10 of mastery study 322",
		1: {
			func: "pow",
			start: 500,
			pow: 0.75,
			derv: true
		}
	},
	bru1_log: {
		name: "log base 10 of Big Rip Upgrade 1",
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
		name: "log base 10 of Break Eternity Upgrade 3",
		1: {
			func: "pow",
			start: 150,
			pow: 0.5,
			derv: false
		}
	},
	inf_time_log_1: {
		name: "log base 10 of Infinite Time reward",
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
		name: "log base 10 of Infinite Time reward in Big Rip",
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
		name: "log base 10 of Infinite Time reward for high values",
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
	ig_log_high: { 
		name: "log base 10 of Intergalactic reward",
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
		name: "Bosonic Antimatter gain per second",
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
		name: "log base 10 of initial infinity dimension power",
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
		name: "log base 10 of tickspeed effect",
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
		name: "20th Bosonic Upgrade",
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
		name: "log base 10 of the multiplier from Eternity Points to Quark gain",
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
		name: "log base 10 of Quantum Challenge 3 reward",
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
		name: "Normal Dimensions (condensed)",
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
		name: "Tickspeed (condensed)",
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
		name: "Sacrifice (condensed)",
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
		name: "Infinity Points (condensed)",
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
		name: "Replicanti in Replicanti to Infinity Point amount (condensed)",
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
		name: "Eternity Points (condensed)",
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

	//NGmX Mods:
	id_ngm4: {
		name: "infinity dimension multiplier (NG-4)",
		1: {
			func: "pow",
			start: new Decimal(1e40),
			pow: .8,
			derv: true
		}
	}
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

function getSoftcapName(id){
	return softcap_data[id]["name"]
}

function hasSoftcapStarted(id, num){
	let l = id.length
	let check = { 
		/*
		this is where you need to put anything else that needs to be true
		that is: if it is false it does not display, but if it is true,
		it continues as if nothing happens
		NOTE: this excludes Big Rip, and other endings that are at the end of words 
		This currently includes: _ngC, _big_rip, _ngm4
		*/
		idbase: tmp.ngp3,
		dt_log: tmp.ngp3 && !tmp.bE50kDT,
		ms322_log: tmp.ngp3,
		EPtoQK: tmp.ngp3,
		qc3reward: tmp.ngp3 && tmp.qcRewards && tmp.qcRewards[3] !== undefined,
		bru1_log: tmp.ngp3 && tmp.bru && tmp.bru[1] !== undefined,
		beu3_log: tmp.ngp3 && tmp.beu && tmp.beu[3] !== undefined,
		bam: tmp.ngp3,
		bu45: tmp.ngp3,
		ig_log_high: tmp.ngp3 && tmp.ig !== undefined,
	}
	if (l >= 4 && !tmp.ngC && id.slice(l - 4, l) == "_ngC") return false
	if (l >= 5 && !player.aarexModifications.ngmX >= 4 && id.slice(l - 5, l) == "_ngm4") return false
	if (tmp.ngp3 && !tmp.qu.bigRip.active && l > 8 && id.slice(l - 8, l) == "_big_rip") return false
	if (check[id] !== undefined && !check[id]) return false
	

	let amt = { // for amount
		dt_log: () => getDilTimeGainPerSecond().plus(1).log10(), 
		ts_reduce_log: () => Decimal.pow(getGalaxyTickSpeedMultiplier(), -1).log10(),
		ts_reduce_log_big_rip: () => Decimal.pow(getGalaxyTickSpeedMultiplier(), -1).log10(),
		ts11_log_big_rip: () => tsMults[11]().log10(),
		ms322_log: () => masteryStudies.timeStudyEffects[322]().log10(),
		bru1_log: () => tmp.bru[1].plus(1).log10(),
		beu3_log: () => tmp.beu[3].plus(1).log10(),
		inf_time_log_1: () => tmp.it.plus(1).log10(),
		inf_time_log_1_big_rip: () => tmp.it.plus(1).log10(),
		inf_time_log_2: () => tmp.it.plus(1).log10(),
		ig_log_high: () => tmp.ig.plus(1).log10(),
		bam: () => getBosonicAMProduction(),
		idbase: () => getStartingIDPower(1).max(getStartingIDPower(2)).max(getStartingIDPower(3)).max(getStartingIDPower(4)).max(getStartingIDPower(5)).max(getStartingIDPower(6)).max(getStartingIDPower(7)).max(getStartingIDPower(8)).plus(1).log10(),
		working_ts: () => getTickspeed().pow(-1).log10(),
		bu45: () => bu.effects[45](),
		EPtoQK: () => getEPtoQKMult(),
		qc3reward: () => Decimal.plus(qcRewards["effects"][3](QCIntensity(3)), 1).log10(),

		// Condensened: () =>
		nds_ngC: () => getDimensionFinalMultiplier(1).div(getIDReplMult()),
		ts_ngC: () => getTickspeed().pow(-1),
		sac_ngC: () => calcSacrificeBoost(),
		ip_ngC: () => getInfinityPointGain(),
		rep_ngC: () => player.replicanti.amount, 
		ep_ngC: () => gainedEternityPoints(),

		//NGmX

		id_ngm4: () => DimensionPower(1).max(DimensionPower(2)).max(DimensionPower(3)).max(DimensionPower(4)).max(DimensionPower(5)).max(DimensionPower(6)).max(DimensionPower(7)).max(DimensionPower(8)),
		//this is actually wrong, need to make sure to only take the softcaps of the ones you have unlocked--make a function for it
	}[id]()
	return hasSoftcapStartedArg(id, num, amt)
}

function hasSoftcapStartedArg(id, num, arg){ // also make it so that if the function is Pow, and the exp is 1 we dont do anything
	return Decimal.gt(arg, softcap_data[id][num].start)
}

function hasFirstSoftcapStarted(id, arg){
	return Decimal.gt(arg, softcap_data[id][1].start) 
}

function numSoftcapsTotal(id){
	let a = Object.keys(softcap_data[id])
	let b = 0
	for (let i = 0; i <= a.length; i++){
		if (!isNaN(parseInt(a[i]))) b ++
	}
	return b
}

function softcapShorten(x){
	if (typeof x == "number" && x < 1000 && x % 1 == 0) return x
	if (x > 1) return formatValue(player.options.notation, x, 3, 3)
	if (x == 1) return 1
	else return shorten(x)
}

function getSoftcapStringEffect(id, num){
	let data = softcap_data[id][num]
	if (data == undefined) return "Nothing, prb bug."
	let name = (getSoftcapName(id) || id) + " #" + num + "."

	var func = data.func
	var vars = softcap_vars[func]

	var v = [data[vars[0]], data[vars[1]], data[vars[2]]]
	for (let i = 0; i < 3; i++) if (typeof v[i] == "function") v[i] = v[i]()
	
	if (func == "pow"){
		let inside = "Start: " + softcapShorten(v[0]) + ", Exponent: " + softcapShorten(v[1])
		if (shiftDown) inside += (v[2] ? ", and keeps " : ", and does not keep ") + "smoothness at softcap start"
		return "Softcap of " + name + " " + inside + "."
	}
	if (func == "log"){ // vars ["pow", "mul", "add"]
		let mult = (v[1] != undefined && Decimal.neq(v[1], 1)) ? ", Times: " + softcapShorten(v[1]) : ""
		let add = ""
		if (v[2] != undefined) {
			if (typeof v[2] != "number" || v[2] > 0) add = (v[2] != undefined && Decimal.neq(v[2], 0)) ? ", Plus: " + softcapShorten(v[2]) : ""
			else add = (v[2] != undefined) ? ", Minus: " + softcapShorten(-1*v[2]) : ""
		}
		let inside = "Log base 10" + mult + add + ", to the Power of " + softcapShorten(v[0])
		end = " "
		if (data.start) end = " Start: " + softcapShorten(data.start) + ", "
		return "Softcap of " + name + end + inside + "."
	} 
	return "oops someone messed up"
}

function getInnerHTMLSoftcap(id){
	let n = numSoftcapsTotal(id)
	let s = ""
	if (!hasSoftcapStarted(id, 1)) return ""
	for (let i = 1; i <= n; i++) {
		if (hasSoftcapStarted(id, i)) s += getSoftcapStringEffect(id, i) + "<br>"
		else return s + "<br><br>"
	}
	return s + "<br><br>"
}

// softcapsbtn is the name of the button to hide/show, it is hidden by default
// we want to show it when any softcap is active

function updateSoftcapStatsTab(){
	let names = {
		dt_log: "softcap_dt",
		ts_reduce_log: "softcap_ts1",
		ts_reduce_log_big_rip: "softcap_tsBR",
		ts11_log_big_rip: "softcap_ts2",
		ms322_log: "softcap_ms322",
		bru1_log: "softcap_bru1",
		beu3_log: "softcap_beu3",
		inf_time_log_1: "softcap_it1",
		inf_time_log_1_big_rip: "softcap_it1BR",
		inf_time_log_2: "softcap_it2",
		ig_log_high: "softcap_ig",
		bam: "softcap_bam",
		idbase: "softcap_idbase",
		working_ts: "softcap_workts",
		bu45: "softcap_bu45",
		EPtoQK: "softcap_epqk",
		qc3reward: "softcap_qc3",
		// Condensened:
		nds_ngC: "softcap_C_nd",
		ts_ngC: "softcap_C_ts",
		sac_ngC: "softcap_C_sac",
		ip_ngC: "softcap_C_ip",
		rep_ngC: "softcap_C_rep",
		ep_ngC: "softcap_C_ep",
		//NGmX
		id_ngm4: "softcap_m4_id",
	}
	let n = Object.keys(names)
	let anyActive = false

	for (let i = 0; i < n.length; i++){
		if (hasSoftcapStarted(n[i], 1)) anyActive = true
	}

	if (anyActive) {
		document.getElementById("softcapsbtn").style = "display:inline-block"
	} else {
		document.getElementById("softcapsbtn").style = "display:none"
	}

	for (let i = 0; i < n.length; i++){
		let elname = names[n[i]]
		if (hasSoftcapStarted(n[i], 1)) {  
			document.getElementById(elname).style = "display:block"
			document.getElementById(elname).innerHTML = getInnerHTMLSoftcap(n[i])
		} else {
			document.getElementById(elname).style = "display:none"
		}
	}
}
